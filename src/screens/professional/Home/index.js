/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, Text, StyleSheet, Alert } from 'react-native'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Avatar } from 'react-native-elements'

import ScreenLoader from '../../../components/ScreenLoader'
import UserTip from '../../../components/UserTip'
import { CoolAlert } from '../../../components/CoolAlert'
import {
    Container,
    ScrollViewStyled,
    Background,
    MenuBars,
    UserView,
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
} from './styles'

import translate from '../../../locales/i18n'
import {
    terms,
    getNameParts,
    getAvatar,
    getInitials,
    getSurveyConfirmation,
} from '../../../utils/consts'
import { ephemOfflineData, formattedForm } from '../../../utils/formConsts'
import { Emojis } from '../../../img/imageConst'
import { scale } from '../../../utils/scalling'
import { useUser } from '../../../hooks/user'
import { updateUser } from '../../../api/user'
import { getFlexibleForm, sendFlexibleAnswer } from '../../../api/flexibleForms'

const Home = ({ navigation }) => {
    const {
        isLoading,
        isOffline,
        signOut,
        token,
        user,
        storeUser,
        getCurrentLocation,
        loadSecondaryData,
        getCurrentUserInfo,
        storeCacheData,
        getCacheData,
    } = useUser()

    const [formVersion, setFormVersion] = useState({})

    const [showTermsConsent, setShowTermsConsent] = useState(false)
    const [hasSignalForm, setHasSignalForm] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [alertTitle, setAlertTitle] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    const person = getCurrentUserInfo()

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

    const showLoadingAlert = () => {
        setAlertMessage(null)
        setShowAlert(true)
        setShowProgressBar(true)
    }

    const sendEvent = async () => {
        showLoadingAlert()

        const flexibleAnswer = {
            id: Math.floor(Math.random() * 1000),
            flexible_form_version: formVersion,
            flexible_form_version_id: formVersion.id,
            data: JSON.stringify({ report_type: 'negative', answers: [] }),
            user,
            user_id: user.id,
            external_system_integration_id: null,
            external_system_data: ephemOfflineData,
            created_at: moment().local().toISOString(),
            is_offline: true,
        }

        if (!isOffline) {
            const response = await sendFlexibleAnswer(
                { flexible_answer: flexibleAnswer },
                token
            )
            showConfirmation(response.status, response.data)

            if (response.status !== 201) {
                console.warn(response.data)
            }
        } else {
            let newSignalAnswers = await getCacheData('pendingAnswers', false)

            if (!newSignalAnswers) {
                newSignalAnswers = []
            }
            newSignalAnswers.push(flexibleAnswer)

            await storeCacheData('pendingAnswers', newSignalAnswers)

            Alert.alert(
                'Sem conexão com a Internet!',
                'Seus registros ficarão armazenados no aplicativo. Quando houver conexão, por favor, abra o aplicativo e aguarde o envio dos dados.'
            )
            setShowProgressBar(false)
        }
    }

    const signalAnswersRoutine = async () => {
        const signalForm = await getCacheData('signalForm', false)

        if (signalForm) {
            setHasSignalForm(true)
        } else {
            setHasSignalForm(false)
        }

        const pendingAnswers = await getCacheData('pendingAnswers', false)

        if (!isOffline && pendingAnswers) {
            const failedAnswers = []

            if (pendingAnswers.length > 0) {
                Alert.alert(
                    'Sinais de alerta',
                    'Por favor, aguarde, enviando registros armazenados no aplicativo.'
                )
            }

            while (pendingAnswers.length > 0) {
                const pendingAnswer = pendingAnswers.pop()

                // eslint-disable-next-line no-await-in-loop
                const response = await sendFlexibleAnswer(
                    { flexible_answer: pendingAnswer },
                    token
                )

                if (response.status !== 201) {
                    console.warn(response.status)
                    failedAnswers.push(pendingAnswer)
                }
            }

            if (failedAnswers.length > 0) {
                Alert.alert(
                    'Erro',
                    'Não foi possível enviar todos os sinais de alerta. Tente novamente mais tarde.'
                )
            }
            await storeCacheData('pendingAnswers', failedAnswers)
        }
    }

    const getEvent = async () => {
        if (!isOffline) {
            // hardcoded form id
            const response = await getFlexibleForm(1, token)

            if (response.status === 200) {
                const { flexible_form } = response.data

                if (flexible_form.flexible_form_version) {
                    const parsedData = JSON.parse(
                        flexible_form.flexible_form_version.data
                    )
                    flexible_form.flexible_form_version.data = parsedData

                    const newFormVersion = formattedForm(
                        flexible_form.flexible_form_version,
                        user
                    )
                    storeCacheData('signalForm', newFormVersion)
                    setFormVersion(newFormVersion)
                }
            }
        } else {
            const signalFormVersion = await getCacheData('signalForm', false)

            if (signalFormVersion) {
                setFormVersion(signalFormVersion)
            }
        }
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

    const fetchData = async () => {
        await loadSecondaryData()

        verifyUserTermsConsent()
        getCurrentLocation()
    }

    useEffect(() => {
        if (!isLoading) {
            fetchData()
        }
    }, [isLoading])

    useEffect(() => {
        getEvent()
    }, [])

    useEffect(() => {
        showOfflineAlert(isOffline)
        signalAnswersRoutine()
    }, [isOffline])

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
                                <AppName>Líderança Comunitária</AppName>
                            </NamesContainer>
                            <Avatar
                                containerStyle={styles.avatar}
                                size={scale(58)}
                                source={getAvatar(person.avatar)}
                                title={getInitials(person.name)}
                                activeOpacity={0.5}
                                rounded
                            />
                        </UserView>
                    </Background>

                    <StatusContainer>
                        <TextStyle>Quer informar um sinal de alerta?</TextStyle>
                        <StatusBemMal>
                            <Bem
                                disabled={isOffline && !hasSignalForm}
                                onPress={() => sendEvent()}
                            >
                                <StatusText>Nada ocorreu</StatusText>
                            </Bem>
                            <Mal
                                disabled={isOffline && !hasSignalForm}
                                onPress={() =>
                                    navigation.navigate('SignalForm', {
                                        isOffline,
                                    })
                                }
                            >
                                <StatusText>Informar</StatusText>
                            </Mal>
                        </StatusBemMal>
                    </StatusContainer>

                    <Tips />

                    <TipButton
                        onPress={() => navigation.navigate('SignalAnswers')}
                    >
                        <UserTip
                            icon={
                                <Feather
                                    name='alert-circle'
                                    size={scale(46)}
                                    color='#ffffff'
                                />
                            }
                            title='Sinais:'
                            message='Veja os sinais de alerta já informados'
                        />
                    </TipButton>
                </ScrollViewStyled>

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
                    confirmText='Ok'
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
