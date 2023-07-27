import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    DateSelector,
    CheckBoxStyled,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { getEventForm, sendEventAnswer } from '../../../api/events'

const EventoForm = ({ navigation }) => {
    const { token, user, group } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({})
    const [answers, setAnswers] = useState({})

    const [loadingAlert, setLoadingAlert] = useState(false)

    const getEvent = async () => {
        const response = await getEventForm(1, token)

        if (response.status === 200) {
            const { event_form } = response.data
            const parsedData = JSON.parse(event_form.data)
            setData(parsedData)
            setIsLoading(false)
        }
    }

    const sendEvent = async () => {
        setLoadingAlert(true)

        const eventAnswer = {
            data: JSON.stringify(data),
            user_id: user.id,
        }

        const response = await sendEventAnswer(
            { event_answer: eventAnswer },
            token
        )

        if (response.status === 201) {
            setLoadingAlert(false)
            navigation.navigate('Home')
        } else {
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const handleAnswer = (question, value) => {
        const dataCopy = { ...data }

        dataCopy.questions.forEach((q) => {
            if (q.id === question.id) {
                q.value = value
            }
        })

        setData(dataCopy)
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
                {data.questions.map((question) => (
                    <FormInline key={question.id}>
                        <FormLabel>
                            {question.text}
                            {question.required ? '*' : ''}
                        </FormLabel>

                        {question.type === 'text' ||
                        question.type === 'number' ? (
                            <NormalInput
                                value={question.value}
                                onChangeText={(text) =>
                                    handleAnswer(question, text)
                                }
                            />
                        ) : null}

                        {question.type === 'date' ? (
                            <DateSelector
                                placeholder={translate('dateSelector.format')}
                                date={question.value}
                                format='DD-MM-YYYY'
                                minDate='01-01-1918'
                                locale='pt-BR'
                                confirmBtnText={translate(
                                    'dateSelector.confirmButton'
                                )}
                                cancelBtnText={translate(
                                    'dateSelector.cancelButton'
                                )}
                                onDateChange={(date) =>
                                    handleAnswer(question, date)
                                }
                            />
                        ) : null}

                        {question.options.map((option) => {
                            return (
                                <CheckBoxStyled
                                    key={option.id}
                                    title={option.label}
                                    checked={question.value === option.value}
                                    onPress={() =>
                                        handleAnswer(question, option.value)
                                    }
                                    full
                                />
                            )
                        })}
                    </FormInline>
                ))}

                <Button onPress={() => sendEvent()}>
                    <SendContainer>
                        <SendText>Enviar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default EventoForm
