import React, { useCallback, useEffect, useState } from 'react'
import {
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    Alert,
    Modal,
} from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'

import ScreenLoader from '../../../components/ScreenLoader'
import UserTip from '../../../components/UserTip'
import { CoolAlert } from '../../../components/CoolAlert'
import {
    Container,
    ScrollViewStyled,
    Background,
    MenuBars,
    UserView,
    Button,
    NamesContainer,
    TextName,
    AppName,
    StatusContainer,
    TextStyle,
    StatusBemMal,
    StatusText,
    Bem,
    Mal,
    Tips,
    TipButton,
    Users,
    UserSelector,
    UserScroll,
    UserWrapper,
    UserName,
} from './styles'

import translate from '../../../../locales/i18n'
import {
    terms,
    getNameParts,
    handleAvatar,
    getInitials,
    getSurveyConfirmation,
    showSurveillanceInvite,
} from '../../../utils/consts'
import { Emojis } from '../../../img/imageConst'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import { getUserHouseholds } from '../../../api/households'
import { createSurvey } from '../../../api/surveys'

const Home = ({ navigation }) => {
    const {
        isLoading,
        isOffline,
        signOut,
        token,
        user,
        storeUser,
        avatar,
        location,
        getCurrentLocation,
        group,
        households,
        storeHouseholds,
        householdAvatars,
        surveys,
        storeSurveys,
        getAppTip,
        hideAppTip,
        lastForm,
        getCacheData,
        storeCacheData,
        updateUserScore,
        loadSecondaryData,
        selectUser,
        getCurrentUserInfo,
    } = useUser()

    const [showTermsConsent, setShowTermsConsent] = useState(false)
    const [hasForm, setHasForm] = useState(false)
    const [hasBadReports, setHasBadReports] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [alertTitle, setAlertTitle] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)
    const [inviteSurveillance, setInviteSurveillance] = useState(false)

    const person = getCurrentUserInfo()

    useFocusEffect(
        useCallback(() => {
            getUserAlerts()
        }, [surveys, lastForm])
    )

    useEffect(() => {
        if (!isLoading) {
            fetchData()
        }
    }, [isLoading])

    useEffect(() => {
        showOfflineAlert(isOffline)
    }, [isOffline])

    useEffect(() => {
        if (
            !user.is_vigilance &&
            group.group_manager &&
            group.group_manager.vigilance_email
        ) {
            setInviteSurveillance(true)
        }
    }, [group])

    const fetchData = async () => {
        await loadSecondaryData()

        verifyUserTermsConsent()
        getCurrentLocation()
        getCacheSurveys()
    }

    const verifyUserTermsConsent = () => {
        const currentPolicyTerms = terms.version
        const userPolicyTerms = user.policy_version

        if (userPolicyTerms < currentPolicyTerms) {
            setShowTermsConsent(true)
        }
    }

    const updateUserTermsConsent = async () => {
        setShowTermsConsent(false)

        const policy = {
            policy_version: terms.version,
        }

        const response = await updateUser({ user: policy }, user.id, token)

        if (response.status === 200) {
            console.warn(response.status)
            storeUser(response.data.user)
        }
    }

    const getCacheSurveys = async () => {
        const surveysCache = await getCacheData('surveysData', false)

        if (surveysCache) {
            storeSurveys(surveysCache)
        }
    }

    const getUserAlerts = () => {
        const todayDate = new Date()
        const lastWeek = new Date()

        lastWeek.setDate(todayDate.getDate() - 7)
        lastWeek.setHours(0, 0, 0, 0)

        const lastFormDate = new Date(lastForm)

        if (!lastForm || lastFormDate.getTime() < lastWeek.getTime()) {
            setHasForm(true)
        } else {
            setHasForm(false)
        }

        const userLastSurveys = surveys.filter(
            (survey) =>
                survey &&
                new Date(survey.created_at).getTime() >= lastWeek.getTime()
        )

        let badReports = 0

        if (userLastSurveys.length > 0) {
            userLastSurveys.forEach((survey) => {
                if (person.is_household) {
                    if (
                        survey.symptom.length > 0 &&
                        survey.household &&
                        survey.household.id === person.id
                    ) {
                        badReports += 1
                    }
                } else if (survey.symptom.length > 0 && !survey.household) {
                    badReports += 1
                }
            })
        }

        setHasBadReports(badReports > 2)
    }

    const getHouseholds = async () => {
        const response = await getUserHouseholds(user.id, token)

        if (response.status === 200) {
            storeHouseholds(response.data.households)
        }
    }

    const showTermsPolicy = () => {
        Alert.alert(
            terms.title,
            terms.text,
            [
                {
                    text: terms.disagree,
                    onPress: () => signOut(),
                    style: 'cancel',
                },
                {
                    text: terms.agree,
                    onPress: () => updateUserTermsConsent(),
                },
            ],
            { cancelable: false }
        )
    }

    const showOfflineAlert = (show) => {
        if (show) {
            setAlertTitle(
                <Text>
                    {translate('home.offlineTitle')} {Emojis.cloud}
                </Text>
            )
            setAlertMessage(
                `${translate('home.offlineMessage')}\n${translate(
                    'home.offlineMessage2'
                )}`
            )
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }

    const showLoadingAlert = () => {
        setAlertMessage(null)
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const showConfirmation = (status, body) => {
        const message = getSurveyConfirmation(status, body)

        setAlertTitle(
            <Text>
                {message.alertTitle} {message.emojiTitle}
            </Text>
        )
        setAlertMessage(
            <Text>
                {message.alertMessage} {message.emojiMessage}
            </Text>
        )

        setShowProgressBar(false)
        console.log(message.alertMessage)
    }

    const sendSurvey = async () => {
        // Send Survey GOOD CHOICE
        showLoadingAlert()

        let local = {}
        if (location.error !== 0) {
            local = await getCurrentLocation()
        } else {
            local = location
        }

        const householdID = person.is_household ? person.id : null
        const survey = {
            household_id: householdID,
            latitude: local.latitude,
            longitude: local.longitude,
            symptom: [],
            created_at: moment().local().toISOString(),
        }

        const response = await createSurvey({ survey }, user.id, token)
        showConfirmation(response.status, response.data)

        updateUserScore()
        if (response.status === 201) {
            if (inviteSurveillance) {
                showSurveillanceInvite(
                    person.name,
                    { status: response.status, body: response.data },
                    showConfirmation,
                    navigation
                )
            }

            await storeCacheData('localPin', survey)

            const newSurveys = surveys.slice()
            newSurveys.push(response.data.survey)
            storeSurveys(newSurveys)
        }
    }

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#348EAC' }} />
            <StatusBar backgroundColor='#348EAC' barStyle='light-content' />
            <Container>
                <ScrollViewStyled>
                    <Background>
                        <UserView>
                            <MenuBars onPress={() => navigation.openDrawer()}>
                                <SimpleLineIcons
                                    name='menu'
                                    size={26}
                                    color='#ffffff'
                                />
                            </MenuBars>
                            <NamesContainer>
                                <TextName>
                                    {translate('home.hello') +
                                        getNameParts(person.name)}
                                </TextName>
                                <AppName>
                                    {translate('home.nowAGuardian')}
                                </AppName>
                            </NamesContainer>
                            <Avatar
                                containerStyle={styles.avatar}
                                size={scale(58)}
                                source={handleAvatar(person.avatar)}
                                title={getInitials(person.name)}
                                editButton={{
                                    name: null,
                                    type: 'feather',
                                    style: styles.avatarDot,
                                }}
                                showEditButton
                                activeOpacity={0.5}
                                rounded
                                onPress={() => {
                                    getHouseholds()
                                    setModalVisible(true)
                                }}
                            />
                        </UserView>
                    </Background>

                    <StatusContainer>
                        <TextStyle>
                            {translate('home.userHowYouFelling')}
                        </TextStyle>
                        <StatusBemMal>
                            <Bem
                                disabled={isOffline}
                                onPress={() => sendSurvey()}
                            >
                                <StatusText>
                                    {translate('report.goodChoice')}
                                </StatusText>
                            </Bem>
                            <Mal
                                disabled={isOffline}
                                onPress={() => navigation.navigate('BadReport')}
                            >
                                <StatusText>
                                    {translate('report.badChoice')}
                                </StatusText>
                            </Mal>
                        </StatusBemMal>
                    </StatusContainer>

                    <Tips>{translate('home.alerts')}</Tips>

                    {user.doses < 4 && getAppTip('vaccination') ? (
                        <TipButton
                            onPress={() => navigation.navigate('Vacinacao')}
                        >
                            <UserTip
                                icon={
                                    <FontAwesome5
                                        name='syringe'
                                        size={scale(46)}
                                        color='#ffffff'
                                    />
                                }
                                title={translate('home.vaccination')}
                                message={translate('home.vaccinationData')}
                                onClose={() => hideAppTip('vaccination')}
                                isCloseable
                            />
                        </TipButton>
                    ) : null}

                    {group.form_id && hasForm ? (
                        <TipButton
                            onPress={() => navigation.navigate('BioSeguranca')}
                        >
                            <UserTip
                                icon={
                                    <SimpleLineIcons
                                        name='bubble'
                                        size={scale(46)}
                                        color='#ffffff'
                                    />
                                }
                                title={translate('home.bioSecurity')}
                                message={translate('home.bioSecurityQuestions')}
                                alert
                            />
                        </TipButton>
                    ) : null}

                    <TipButton>
                        <UserTip
                            icon={
                                <SimpleLineIcons
                                    name={
                                        hasBadReports ? 'exclamation' : 'check'
                                    }
                                    size={scale(46)}
                                    color='#ffffff'
                                />
                            }
                            title={translate('home.statusLast7Days')}
                            message={
                                hasBadReports
                                    ? translate('home.statusLast7DaysBad')
                                    : translate('home.statusLast7DaysGood')
                            }
                            alert={hasBadReports}
                        />
                    </TipButton>
                </ScrollViewStyled>

                <Modal
                    animationType='fade'
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}
                >
                    <Users>
                        <UserSelector>
                            <UserScroll>
                                <UserWrapper>
                                    <Button
                                        onPress={async () => {
                                            setModalVisible(!modalVisible)
                                            await selectUser(user)
                                            getUserAlerts()
                                        }}
                                    >
                                        <Avatar
                                            size={scale(60)}
                                            source={handleAvatar(avatar)}
                                            title={getInitials(user.user_name)}
                                            rounded
                                        />
                                        <UserName>
                                            {getNameParts(user.user_name, true)}
                                        </UserName>
                                    </Button>
                                </UserWrapper>
                                {households.map((household) => (
                                    <UserWrapper key={household.id}>
                                        <Button
                                            onPress={async () => {
                                                setModalVisible(!modalVisible)
                                                await selectUser(household)
                                                getUserAlerts()
                                            }}
                                        >
                                            <Avatar
                                                size={scale(60)}
                                                source={handleAvatar(
                                                    householdAvatars[
                                                        household.id
                                                    ]
                                                )}
                                                title={getInitials(
                                                    household.description
                                                )}
                                                rounded
                                            />
                                            <UserName>
                                                {getNameParts(
                                                    household.description,
                                                    true
                                                )}
                                            </UserName>
                                        </Button>
                                    </UserWrapper>
                                ))}
                                <UserWrapper>
                                    <Button
                                        onPress={() => {
                                            setModalVisible(!modalVisible)
                                            navigation.navigate('NovoPerfil')
                                        }}
                                    >
                                        <Feather
                                            name='plus'
                                            size={scale(60)}
                                            color='#c4c4c4'
                                        />
                                        <UserName>
                                            {translate('home.addProfile')}
                                        </UserName>
                                    </Button>
                                </UserWrapper>
                            </UserScroll>
                        </UserSelector>
                    </Users>
                </Modal>

                <CoolAlert
                    show={showTermsConsent}
                    title={translate('useTerms.consentTitle')}
                    message={translate('useTerms.consentMessage')}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showConfirmButton
                    confirmText={translate('useTerms.seeTerms')}
                    onConfirmPressed={() => showTermsPolicy()}
                />
                <CoolAlert
                    show={showAlert}
                    showProgress={showProgressBar}
                    title={
                        showProgressBar
                            ? translate('badReport.messages.sending')
                            : alertTitle
                    }
                    message={alertMessage}
                    closeOnTouchOutside={!showProgressBar}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={!showProgressBar}
                    confirmText={translate('badReport.messages.confirmText')}
                    onConfirmPressed={() => setShowAlert(false)}
                    onDismiss={() => setShowAlert(false)}
                />
            </Container>
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
        marginRight: `${scale(8)}%`,
        borderColor: '#ffffff',
        borderWidth: 3,
    },
    avatarDot: {
        height: scale(14),
        width: scale(14),
        backgroundColor: '#ffffff',
        left: 0,
        shadowOpacity: 0,
    },
})

export default Home
