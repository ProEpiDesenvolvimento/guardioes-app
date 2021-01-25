import React, { useEffect, useState, useCallback } from 'react'
import {
    SafeAreaView,
    StatusBar,
    Text,
    StyleSheet,
    Alert,
    Modal,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { Avatar } from 'react-native-elements'
import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Emoji from 'react-native-emoji'

import ScreenLoader from '../../../components/ScreenLoader'
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
    Alerts,
    AlertContainer,
    StatusAlert,
    StatusTitle,
    StatusAlertText,
    Users,
    UserSelector,
    UserScroll,
    UserWrapper,
    UserName,
} from './styles'

import {
    terms,
    getNameParts,
    handleAvatar,
    getInitials,
} from '../../../utils/constUtils'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scallingUtils'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import { getUserHouseholds } from '../../../api/households'
import { getUserSurveys, createSurvey } from '../../../api/surveys'

Feather.loadFont()
SimpleLineIcons.loadFont()

const Home = ({ navigation }) => {
    const {
        isLoading,
        token,
        data,
        avatar,
        location,
        getCurrentLocation,
        households,
        storeHouseholds,
        householdAvatars,
        storeSurveys,
        updateUserScore,
        loadSecondaryData,
        selectUser,
        getCurrentUserInfo,
    } = useUser()

    const [showTermsConsent, setShowTermsConsent] = useState(false)
    const [userLastSurveys, setUserLastSurveys] = useState([])
    const [userBadReports, setUserBadReports] = useState(0)
    const [hasBadReports, setHasBadReports] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setProgressBar] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)

    const user = getCurrentUserInfo()

    useEffect(() => {
        if (!isLoading) {
            fetchData()
        }
    }, [isLoading])

    const fetchData = async () => {
        await loadSecondaryData()

        verifyUserTermsConsent()
        getCurrentLocation()
        getUserLastSurveys()
    }

    const verifyUserTermsConsent = () => {
        const currentPolicyTerms = terms.version
        const userPolicyTerms = data.policy_version

        if (userPolicyTerms < currentPolicyTerms) {
            setShowTermsConsent(true)
        }
    }

    const showTermsPolicy = () => {
        setShowTermsConsent(false)

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

    const updateUserTermsConsent = async () => {
        const policy = {
            policy_version: terms.version,
        }

        const response = await updateUser(policy, data.id, token)

        if (response.status === 200) {
            console.warn(response.status)
        }
    }

    const getUserLastSurveys = useCallback(async () => {
        const response = await getUserSurveys(data.id, token)

        if (response.status === 200) {
            storeSurveys(response.body.surveys)

            const todayDate = new Date()
            const lastWeek = new Date()

            lastWeek.setDate(todayDate.getDate() - 7)
            lastWeek.setHours(0, 0, 0, 0)

            const userLastSurveys = response.body.surveys.filter(
                (survey) =>
                    new Date(survey.created_at).getTime() >= lastWeek.getTime()
            )

            setUserLastSurveys(userLastSurveys)
            getUserHealth()
        }
    }, [token])

    const getHouseholds = async () => {
        const response = await getUserHouseholds(data.id, token)
        if (response.status === 200) {
            storeHouseholds(response.body.households)
        }
    }

    const getUserHealth = () => {
        let badReports = 0

        if (userLastSurveys.length > 0) {
            userLastSurveys.map((survey) => {
                if (user.is_household) {
                    if (
                        survey.symptom.length > 0 &&
                        survey.household &&
                        survey.household.id === user.id
                    ) {
                        badReports += 1
                    }
                } else if (survey.symptom.length > 0 && !survey.household) {
                    badReports += 1
                }
            })
        }

        setUserBadReports(badReports)
        setHasBadReports(userBadReports > 2)
    }

    const sendSurvey = async () => {
        // Send Survey GOOD CHOICE
        await getCurrentLocation()
        if (location.error !== 0) return

        showLoadingAlert()
        const householdID = user.is_household ? user.id : null

        const survey = {
            household_id: householdID,
            latitude: location.latitude,
            longitude: location.longitude,
        }

        const response = await createSurvey(survey, data.id, token)
        showConfirmation(response.body)
        updateUserScore()

        if (response.status === 200) {
            await AsyncStorage.setItem('localPin', JSON.stringify(survey))
        }
    }

    const showLoadingAlert = () => {
        setAlertMessage(null)
        setShowAlert(true)
        setProgressBar(true)
    }

    const showConfirmation = (response) => {
        let alertMessage = ''

        if (response !== null && !response.errors) {
            alertMessage = response.feedback_message
                ? response.feedback_message
                : translate('badReport.alertMessages.reportSent')
        } else {
            alertMessage = translate('badReport.alertMessages.reportNotSent')
        }

        setAlertMessage(
            <Text>
                {alertMessage} {emojis[0]}
            </Text>
        )
        setProgressBar(false)
        console.log(alertMessage)
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
                            <NamesContainer>
                                <TextName>
                                    {translate('home.hello') +
                                        getNameParts(user.name)}
                                </TextName>
                                <AppName>
                                    {translate('home.nowAGuardian')}
                                </AppName>
                            </NamesContainer>
                            <Avatar
                                containerStyle={styles.avatar}
                                size={scale(58)}
                                source={handleAvatar(user.avatar)}
                                title={getInitials(user.name)}
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
                            <Bem onPress={() => sendSurvey()}>
                                <StatusText>
                                    {translate('report.goodChoice')}
                                </StatusText>
                            </Bem>
                            <Mal
                                onPress={() => navigation.navigate('BadReport')}
                            >
                                <StatusText>
                                    {translate('report.badChoice')}
                                </StatusText>
                            </Mal>
                        </StatusBemMal>
                    </StatusContainer>

                    <Alerts>{translate('home.alerts')}</Alerts>

                    <AlertContainer alert={hasBadReports}>
                        <SimpleLineIcons
                            name={hasBadReports ? 'exclamation' : 'check'}
                            size={48}
                            color='#ffffff'
                        />
                        <StatusAlert>
                            <StatusTitle>
                                {translate('home.statusLast7Days')}
                            </StatusTitle>
                            <StatusAlertText>
                                {hasBadReports
                                    ? translate('home.statusLast7DaysBad')
                                    : translate('home.statusLast7DaysGood')}
                            </StatusAlertText>
                        </StatusAlert>
                    </AlertContainer>

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
                                                await selectUser(data)
                                                getUserHealth()
                                            }}
                                        >
                                            <Avatar
                                                size={scale(60)}
                                                source={handleAvatar(avatar)}
                                                title={getInitials(
                                                    data.user_name
                                                )}
                                                rounded
                                            />
                                            <UserName>
                                                {getNameParts(
                                                    data.user_name,
                                                    true
                                                )}
                                            </UserName>
                                        </Button>
                                    </UserWrapper>
                                    {households.map((household) => (
                                        <UserWrapper key={household.id}>
                                            <Button
                                                onPress={async () => {
                                                    setModalVisible(
                                                        !modalVisible
                                                    )
                                                    await selectUser(household)
                                                    getUserHealth()
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
                                                navigation.navigate(
                                                    'NovoPerfil'
                                                )
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
                </ScrollViewStyled>

                <MenuBars onPress={() => navigation.openDrawer()}>
                    <SimpleLineIcons name='menu' size={26} color='#ffffff' />
                </MenuBars>

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
                        showProgressBar ? (
                            translate('badReport.alertMessages.sending')
                        ) : (
                            <Text>
                                {translate('badReport.alertMessages.thanks')}{' '}
                                {emojis[1]}
                                {emojis[1]}
                                {emojis[1]}
                            </Text>
                        )
                    }
                    message={alertMessage}
                    closeOnTouchOutside={!showProgressBar}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={!showProgressBar}
                    confirmText={translate(
                        'badReport.alertMessages.confirmText'
                    )}
                    onCancelPressed={() => setShowAlert(false)}
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

const emojis = [
    <Emoji // Emoji heart up
        name='heart'
        style={{ fontSize: scale(15) }}
    />,
    <Emoji // Emoji tada up
        name='tada'
        style={{ fontSize: scale(15) }}
    />,
]

export default Home
