import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'
import FlexibleFormBuilder from '../../../components/FlexibleFormBuilder'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../locales/i18n'
import { capitalizeFirstWords } from '../../../utils/consts'
import { useUser } from '../../../hooks/user'
import { getFlexibleForm, sendFlexibleAnswer } from '../../../api/events'

const EventoForm = ({ navigation }) => {
    const { token, user, group } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [formVersion, setFormVersion] = useState({})

    const [loadingAlert, setLoadingAlert] = useState(false)

    const formattedForm = (formVersion) => {
        formVersion.data.forEach((question) => {
            if (question.type === 'geo_country') {
                question.value = user.country
            }
            if (question.type === 'geo_state') {
                question.value = capitalizeFirstWords(user.state)
            }
            if (question.type === 'geo_city') {
                question.value = capitalizeFirstWords(user.city)
            }
        })
        return formVersion
    }

    const getEvent = async () => {
        // hardcoded form id
        const response = await getFlexibleForm(1, token)

        if (response.status === 200) {
            const { flexible_form } = response.data

            if (flexible_form.latest_version) {
                const parsedData = JSON.parse(flexible_form.latest_version.data)
                flexible_form.latest_version.data = parsedData

                const newFormVersion = formattedForm(
                    flexible_form.latest_version
                )
                setFormVersion(newFormVersion)
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEvent()
    }, [])

    const sendEvent = async () => {
        setLoadingAlert(true)

        const answers = []
        let error = false

        formVersion.data.forEach((question) => {
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
            setLoadingAlert(false)
            Alert.alert(translate('register.fillRequired'))
            return
        }

        const flexibleAnswer = {
            flexible_form_version_id: formVersion.id,
            data: JSON.stringify(answers),
            user_id: user.id,
        }

        const response = await sendFlexibleAnswer(
            { flexible_answer: flexibleAnswer },
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

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                <FlexibleFormBuilder
                    formVersion={formVersion}
                    setFormVersion={setFormVersion}
                />

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
