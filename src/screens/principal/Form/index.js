import React, { useEffect, useState } from 'react'

import Feather from 'react-native-vector-icons/Feather'

import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    FormInlineCheck,
    CheckBoxStyled,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import { useUser } from '../../../hooks/user'
import { getForm } from '../../../api/forms'

Feather.loadFont()

const Form = ({ navigation }) => {
    const { token } = useUser()

    const [questions, setQuestions] = useState([])

    const [loadingAlert, setLoadingAlert] = useState(true)

    const getBioSecurityForm = async () => {
        const response = await getForm(1, token)

        if (response.status === 200) {
            console.log(response.body)
            setQuestions(response.body)
            setLoadingAlert(false)
        }
    }

    useEffect(() => {
        getBioSecurityForm()
    }, [])

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                {questions.map((question) => (
                    <FormInlineCheck>
                        <FormLabel>{question.text}</FormLabel>

                        {question.map((option) => {
                            if (question.kind === 'multiple') {
                                return (
                                    <CheckBoxStyled
                                        title={option.text}
                                        checked={false}
                                        onPress={() => {}}
                                    />
                                )
                            }

                            return (
                                <NormalInput value='' onChangeText={() => {}} />
                            )
                        })}
                    </FormInlineCheck>
                ))}

                <Button onPress={() => {}}>
                    <SendContainer>
                        <SendText>Criar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Form
