import React, { useEffect, useState, useRef } from 'react'
import { Alert } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import {
    Container,
    FormInline,
    FormLabel,
    CheckBoxStyled,
    Button,
    SendContainer,
    SendText,
    FormTip,
} from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    ContentContainer,
    QuestionInfo,
    SwiperContainer,
} from './styles'

import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { sendFlexibleAnswer } from '../../../api/flexibleForms'

const Quiz = ({ navigation, route }) => {
    const { token, user, group } = useUser()
    const { quiz } = route.params

    const [formVersion, setFormVersion] = useState(quiz?.flexible_form_version)
    const [swiperIndex, setSwiperIndex] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    const [tipText, setTipText] = useState('')
    const [points, setPoints] = useState(0)

    const [loadingAlert, setLoadingAlert] = useState(false)

    const swiper = useRef()

    const sendQuiz = async () => {
        setLoadingAlert(true)

        const answers = []
        let error = false

        formVersion.data.questions.forEach((question) => {
            if (question.required && !question.value) {
                error = true
            }
            if (!error) {
                answers.push({
                    ...question,
                    support_text: undefined,
                    source: undefined,
                    type: undefined,
                    text: undefined,
                    options: undefined,
                    required: undefined,
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
            data: JSON.stringify({ points, answers }),
            user_id: user.id,
        }

        const response = await sendFlexibleAnswer(
            { flexible_answer: flexibleAnswer },
            token
        )

        if (response.status === 201) {
            console.log(response.data)
            setLoadingAlert(false)
            navigation.navigate('Quiz')
        } else {
            console.warn(response.status)
            Alert.alert(translate('register.geralError'))
            setLoadingAlert(false)
        }
    }

    const handleAnswer = (question, value) => {
        const newFormVersion = { ...formVersion }

        newFormVersion.data.questions.forEach((q) => {
            if (q.field === question.field) {
                q.value = value
            }
        })
        setFormVersion(newFormVersion)
    }

    const goToNextQuestion = () => {
        setTipText('')
        setShowNextButton(false)

        let newSwiperIndex = 0

        if (swiperIndex < formVersion.data.questions.length - 1) {
            newSwiperIndex = swiperIndex + 1
            setLastQuestion(false)
        } else {
            setLastQuestion(true)
        }
        swiper.current.scrollToIndex({ index: newSwiperIndex })
        setSwiperIndex(newSwiperIndex)
    }

    const checkQuestion = () => {
        const currentQuestion = formVersion.data.questions[swiperIndex]

        if (!currentQuestion.value) {
            Alert.alert(
                'Responda a pergunta',
                'Você precisa responder a pergunta para continuar'
            )
            return
        }

        const [correctAnswer] = currentQuestion.options.filter(
            (option) => option.correct === true
        )

        if (correctAnswer.value === currentQuestion.value) {
            const newPoints = points + 1
            setPoints(newPoints)

            setTipText('Alternativa correta!')
        } else {
            setTipText(
                `Alternativa incorreta! Resposta correta: "${correctAnswer.label}"`
            )
        }

        setShowNextButton(true)
    }

    return (
        <Container>
            <ScrollViewStyled>
                <ContentContainer>
                    <QuestionInfo>
                        Questão {swiperIndex + 1} /{' '}
                        {formVersion.data.questions.length}
                    </QuestionInfo>
                </ContentContainer>

                <SwiperFlatList
                    showPagination={false}
                    disableGesture
                    ref={swiper}
                >
                    {formVersion.data.questions.map((question, index) => (
                        <SwiperContainer key={question.field}>
                            <FormInline>
                                <FormLabel>
                                    {index + 1}. {question.text}
                                </FormLabel>

                                {question.options.map((option) => (
                                    <CheckBoxStyled
                                        key={option.value}
                                        title={option.label}
                                        checked={
                                            question.value === option.value
                                        }
                                        onPress={() =>
                                            handleAnswer(question, option.value)
                                        }
                                        disabled={showNextButton}
                                        full
                                    />
                                ))}

                                {!!tipText && <FormTip>{tipText}</FormTip>}
                            </FormInline>
                        </SwiperContainer>
                    ))}
                </SwiperFlatList>

                {!showNextButton && !lastQuestion && (
                    <Button onPress={() => checkQuestion()}>
                        <SendContainer>
                            <SendText>Confirmar</SendText>
                        </SendContainer>
                    </Button>
                )}

                {showNextButton && !lastQuestion && (
                    <Button onPress={() => goToNextQuestion()}>
                        <SendContainer>
                            <SendText>Próxima</SendText>
                        </SendContainer>
                    </Button>
                )}

                {!showNextButton && lastQuestion && (
                    <Button onPress={() => sendQuiz()}>
                        <SendContainer>
                            <SendText>Finalizar</SendText>
                        </SendContainer>
                    </Button>
                )}
            </ScrollViewStyled>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Quiz
