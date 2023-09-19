import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Alert, BackHandler, Modal, Linking } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { useFocusEffect } from '@react-navigation/native'

import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ModalButton,
    ModalButtonText,
    Button,
    ButtonClose,
    ModalClose,
    Container,
    FormInline,
    FormLabel,
    CheckBoxStyled,
    SendContainer,
    SendText,
    FormTip,
} from '../../../components/NormalForms'
import {
    ScrollViewStyled,
    ContentContainer,
    QuestionInfo,
    SwiperContainer,
    QuizContainer,
    QuizBox,
    QuizTitle,
    QuizIconWrapper,
    QuizBodyText,
} from './styles'

import LoadingModal from '../../../components/LoadingModal'
import translate from '../../../../locales/i18n'
import { scale } from '../../../utils/scalling'
import { WarningIcon, AwardIcon } from '../../../img/imageConst'
import { useUser } from '../../../hooks/user'
import { sendFlexibleAnswer } from '../../../api/flexibleForms'

const Quiz = ({ navigation, route }) => {
    const { token, user } = useUser()
    const { quiz } = route.params

    const [formVersion, setFormVersion] = useState(quiz?.flexible_form_version)
    const [quizStep, setQuizStep] = useState(1)
    const [swiperIndex, setSwiperIndex] = useState(0)
    const [tipText, setTipText] = useState('')
    const [showNextButton, setShowNextButton] = useState(false)
    const [lastQuestion, setLastQuestion] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)
    const [percentage, setPercentage] = useState(0)

    const [loadingAlert, setLoadingAlert] = useState(false)
    const [modalSupport, setModalSupport] = useState(false)
    const [questionSelected, setQuestionSelected] = useState({})

    const swiper = useRef()

    const sendQuiz = async (skipError = false) => {
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

        if (error && !skipError) {
            setLoadingAlert(false)
            Alert.alert(translate('register.fillRequired'))
            return
        }

        const flexibleAnswer = {
            flexible_form_version_id: formVersion.id,
            data: JSON.stringify({ percentage, answers }),
            user_id: user.id,
        }

        const response = await sendFlexibleAnswer(
            { flexible_answer: flexibleAnswer },
            token
        )

        if (response.status === 201) {
            setQuizStep(3)
            setLoadingAlert(false)
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
        setLastQuestion(false)

        let newSwiperIndex = 0

        if (swiperIndex < formVersion.data.questions.length - 1) {
            newSwiperIndex = swiperIndex + 1
        } else {
            newSwiperIndex = swiperIndex
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
            const newCount = correctCount + 1
            setCorrectCount(newCount)

            setTipText('Alternativa correta!')
        } else {
            setTipText(
                `Alternativa incorreta! Resposta correta: "${correctAnswer.label}"`
            )
        }

        if (swiperIndex < formVersion.data.questions.length - 1) {
            setShowNextButton(true)
            setLastQuestion(false)
        } else {
            setShowNextButton(false)
            setLastQuestion(true)
        }
    }

    const previousScreenAlert = (e) => {
        if (quizStep === 2) {
            e?.preventDefault()

            Alert.alert(
                'Sair do Quiz',
                'Você tem certeza que deseja sair do quiz? Você NÃO poderá responder novamente.',
                [
                    {
                        text: 'Cancelar',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Sair',
                        onPress: async () => {
                            if (e) {
                                await sendQuiz(true)
                                navigation.dispatch(e.data.action)
                            } else {
                                await sendQuiz(true)
                                navigation.navigate('Quizzes')
                            }
                        },
                    },
                ]
            )
            return true
        }
        return false
    }

    useEffect(() => {
        const newPercentage =
            (correctCount / formVersion.data.questions.length) * 100

        setPercentage(newPercentage)
    }, [correctCount])

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                previousScreenAlert(e)
            }),
        [navigation, quizStep]
    )

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener(
                'hardwareBackPress',
                previousScreenAlert
            )

            return () =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    previousScreenAlert
                )
        }, [quizStep])
    )

    return (
        <Container>
            <Modal // Modal View for Support Text
                animationType='fade'
                transparent
                visible={modalSupport}
                onRequestClose={() => setModalSupport(!modalSupport)}
            >
                <ModalContainer>
                    <ModalBox>
                        <ModalTitle>
                            Conteúdo - Questão {swiperIndex + 1}
                        </ModalTitle>

                        <ModalText>{questionSelected.support_text}</ModalText>

                        <Button
                            onPress={() =>
                                Linking.openURL(questionSelected.source)
                            }
                        >
                            <ModalButton>
                                <ModalButtonText>Saiba Mais</ModalButtonText>
                            </ModalButton>
                        </Button>

                        <ButtonClose onPress={() => setModalSupport(false)}>
                            <ModalClose>
                                <Feather
                                    name='x'
                                    size={scale(24)}
                                    color='#ffffff'
                                />
                            </ModalClose>
                        </ButtonClose>
                    </ModalBox>
                </ModalContainer>
            </Modal>

            <ScrollViewStyled>
                {quizStep === 1 && (
                    <QuizContainer>
                        <QuizBox>
                            <QuizTitle>
                                Você está prestes a responder o Quiz -{' '}
                                {quiz.title}
                            </QuizTitle>

                            <QuizIconWrapper>
                                <WarningIcon
                                    height={scale(82)}
                                    width={scale(82)}
                                />
                            </QuizIconWrapper>

                            <QuizBodyText>
                                - Certifique-se de que sua conexão à internet
                                esteja funcionando.{'\n'} - Não retorne à tela
                                anterior após iniciar o Quiz, pois não será
                                possível respondê-lo novamente.{'\n'} - Não é
                                possível voltar a pergunta anterior.{'\n'} -
                                Encontre o conteúdo de referência de cada
                                pergunta no canto superior direito.
                            </QuizBodyText>
                        </QuizBox>

                        <Button onPress={() => setQuizStep(2)}>
                            <SendContainer>
                                <SendText>Iniciar</SendText>
                            </SendContainer>
                        </Button>
                    </QuizContainer>
                )}

                {quizStep === 2 && (
                    <>
                        <ContentContainer>
                            <QuestionInfo>
                                Questão {swiperIndex + 1} /{' '}
                                {formVersion.data.questions.length}
                            </QuestionInfo>

                            <Button
                                onPress={() => {
                                    setQuestionSelected(
                                        formVersion.data.questions[swiperIndex]
                                    )
                                    setModalSupport(true)
                                }}
                            >
                                <Feather
                                    name='book-open'
                                    size={scale(24)}
                                    color='#348eac'
                                />
                            </Button>
                        </ContentContainer>

                        <SwiperFlatList
                            showPagination={false}
                            disableGesture
                            ref={swiper}
                        >
                            {formVersion.data.questions.map(
                                (question, index) => (
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
                                                        question.value ===
                                                        option.value
                                                    }
                                                    onPress={() =>
                                                        handleAnswer(
                                                            question,
                                                            option.value
                                                        )
                                                    }
                                                    disabled={!!tipText}
                                                    full
                                                />
                                            ))}

                                            {!!tipText && (
                                                <FormTip>{tipText}</FormTip>
                                            )}
                                        </FormInline>
                                    </SwiperContainer>
                                )
                            )}
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
                    </>
                )}

                {quizStep === 3 && (
                    <QuizContainer>
                        <QuizBox>
                            <QuizTitle>Quiz finalizado</QuizTitle>

                            <QuizIconWrapper>
                                <AwardIcon
                                    height={scale(82)}
                                    width={scale(82)}
                                />
                            </QuizIconWrapper>

                            <QuizBodyText style={{ textAlign: 'center' }}>
                                Você acertou {correctCount} de{' '}
                                {formVersion.data.questions.length} questões.
                                {'\n'}({percentage.toFixed(0)}/100)
                            </QuizBodyText>
                        </QuizBox>

                        <Button onPress={() => navigation.navigate('Quizzes')}>
                            <SendContainer>
                                <SendText>Voltar aos Quizzes</SendText>
                            </SendContainer>
                        </Button>
                    </QuizContainer>
                )}
            </ScrollViewStyled>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default Quiz
