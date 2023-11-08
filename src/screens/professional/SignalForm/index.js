import React, { useEffect, useState } from 'react'
import { Alert, Text } from 'react-native'
import moment from 'moment'

import ScreenLoader from '../../../components/ScreenLoader'
import { CoolAlert } from '../../../components/CoolAlert'
import {
    Container,
    KeyboardScrollView,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import FlexibleFormBuilder from '../../../components/FlexibleFormBuilder'

import translate from '../../../locales/i18n'
import { getSurveyConfirmation } from '../../../utils/consts'
import { ephemOfflineData, formattedForm } from '../../../utils/formConsts'
import { useUser } from '../../../hooks/user'
import { getFlexibleForm, sendFlexibleAnswer } from '../../../api/events'

const SignalForm = ({ navigation }) => {
    const { isOffline, token, user, storeCacheData, getCacheData } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [formVersion, setFormVersion] = useState({})
    const [fV2, setFV2] = useState({})

    const [showAlert, setShowAlert] = useState(false)
    const [showProgressBar, setShowProgressBar] = useState(false)
    const [alertTitle, setAlertTitle] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

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

        const answers = []
        let error = false

        fV2.data.questions.forEach((question) => {
            if (question.required && !question.value) {
                error = true
            }
            if (!error) {
                answers.push({
                    ...question,
                    options: undefined,
                    required: undefined,
                    text: undefined,
                    type: undefined,
                })
            }
        })

        if (error) {
            setShowProgressBar(false)
            Alert.alert(translate('register.fillRequired'))
            return
        }

        const flexibleAnswer = {
            id: Math.floor(Math.random() * 1000),
            flexible_form_version: formVersion,
            flexible_form_version_id: formVersion.id,
            data: JSON.stringify({ report_type: 'positive', answers }),
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
                console.warn(response.status)
                Alert.alert(translate('register.geralError'))
                setShowProgressBar(false)
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

    const getEvent = async () => {
        if (!isOffline) {
            // hardcoded form id
            const response = await getFlexibleForm(9, token)

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
                    setFV2(JSON.parse(JSON.stringify(newFormVersion)))
                }
                setIsLoading(false)
            }
        } else {
            const signalFormVersion = await getCacheData('signalForm', false)

            if (signalFormVersion) {
                setFormVersion(signalFormVersion)
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        getEvent()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                <FlexibleFormBuilder
                    formVersion={formVersion}
                    fV2={fV2}
                    setFV2={setFV2}
                    isOffline={isOffline}
                />

                <Button onPress={() => sendEvent()}>
                    <SendContainer>
                        <SendText>Enviar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

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
                onConfirmPressed={() => navigation.navigate('Home')}
                onDismiss={() => setShowAlert(false)}
            />
        </Container>
    )
}

export default SignalForm
