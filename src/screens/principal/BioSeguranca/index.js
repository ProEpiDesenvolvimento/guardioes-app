import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    CheckBoxStyled,
    Button,
    SendContainer,
    SendText,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import {
    isQuestionAnswered,
    isOptionSelected,
    validForm,
} from '../../../utils/formConsts'
import { getForm, sendFormAnswers } from '../../../api/forms'

const BioSeguranca = ({ navigation }) => {
    const { token, user, group, storeLastForm } = useUser()

    const [isLoading, setIsLoading] = useState(true)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const [loadingAlert, setLoadingAlert] = useState(false)

    const getBioSecurityForm = async () => {
        const response = await getForm(group.form_id, token)

        if (response.status === 200) {
            const { form } = response.data
            setQuestions(form.form_questions)
            setIsLoading(false)
        }
    }

    const sendBioSecurityForm = async () => {
        const lastFormDate = new Date()
        lastFormDate.setHours(0, 0, 0, 0)

        if (!validForm(questions, answers)) return
        setLoadingAlert(true)

        const response = await sendFormAnswers({ form_answers: answers }, token)

        if (response.status === 201) {
            storeLastForm(lastFormDate)
            setLoadingAlert(false)
            navigation.navigate('Home')
        } else {
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const handleAnswer = (question, option) => {
        const answer = {
            form_id: group.form_id,
            form_question_id: question.id,
            form_option_id: option.id,
            user_id: user.id,
        }

        if (isQuestionAnswered(answers, option)) {
            const newAnswers = answers.filter(
                (ans) => ans.form_question_id !== option.form_question_id
            )

            setAnswers([...newAnswers, answer])
        } else if (isOptionSelected(answers, option)) {
            const newAnswers = answers.filter(
                (ans) => ans.form_option_id !== option.id
            )

            setAnswers(newAnswers)
        } else {
            setAnswers([...answers, answer])
        }
    }

    useEffect(() => {
        getBioSecurityForm()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                {questions.map((question, index) => (
                    <FormInline key={question.id}>
                        <FormLabel>
                            {index + 1}. {question.text}
                        </FormLabel>

                        {question.form_options.map((option) => (
                            <CheckBoxStyled
                                key={option.id}
                                title={option.text}
                                checked={isOptionSelected(answers, option)}
                                onPress={() => handleAnswer(question, option)}
                                full
                            />
                        ))}
                    </FormInline>
                ))}

                <Button onPress={() => sendBioSecurityForm()}>
                    <SendContainer>
                        <SendText>Enviar</SendText>
                    </SendContainer>
                </Button>
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default BioSeguranca
