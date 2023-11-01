import React, { useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'
import ScreenLoader from '../../../components/ScreenLoader'
import { Container } from '../../../components/NormalForms'
import { ScrollViewStyled } from '../../../components/PageItems'
import { Box, Button, IconWrapper, InfoWrapper, Title } from './styles'

import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { scale } from '../../../utils/scalling'
import {
    getFlexibleQuizzes,
    getFlexibleAnswers,
} from '../../../api/flexibleForms'

const Quizzes = ({ navigation }) => {
    const { isOffline, token } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [forms, setForms] = useState([])
    const [formAnswers, setFormAnswers] = useState([])
    const [quizzes, setQuizzes] = useState([])

    const getQuizIconName = (quiz) => {
        const formVersion = quiz.flexible_form_version

        if (quiz.tried && quiz.done) {
            return 'check-square'
        }
        if (formVersion.data) {
            const startDate = moment(formVersion.data.start_date)
            const endDate = moment(formVersion.data.end_date)
            const currentDate = moment(formVersion.current_date)

            const isBetweenDates = currentDate.isBetween(startDate, endDate)

            if (isBetweenDates) {
                return 'unlock'
            }
            if (!isBetweenDates && quiz.tried) {
                return 'square'
            }
            return 'lock'
        }
        return 'lock'
    }

    const formattedQuizzes = () => {
        const newQuizzes = []

        forms.forEach((form) => {
            const answers = formAnswers.filter(
                (answer) => answer.flexible_form.id === form.id
            )
            const answer = answers[0]

            if (answer?.data) {
                try {
                    const parsedData = JSON.parse(answer.data)
                    answer.data = parsedData
                } catch {
                    answer.data = {}
                }
            }

            if (form.flexible_form_version?.data) {
                try {
                    const parsedData = JSON.parse(
                        form.flexible_form_version.data
                    )
                    form.flexible_form_version.data = parsedData
                } catch (err) {
                    console.log(err)
                }
            }

            // tried: if the user has already answered the quiz
            // done: if the user has answered all the questions of the quiz
            newQuizzes.push({
                ...form,
                percentage: answer?.data.percentage || 0,
                tried: answers.length > 0,
                done: answer?.data.answers?.length > 0,
            })
        })

        setQuizzes(newQuizzes)
    }

    const getAnswers = async () => {
        const response = await getFlexibleAnswers(token)

        if (response.status === 200) {
            const { flexible_answers } = response.data

            setFormAnswers(flexible_answers)
        }
    }

    const getForms = async () => {
        const response = await getFlexibleQuizzes(token)

        if (response.status === 200) {
            const { flexible_forms } = response.data

            setForms(flexible_forms)
        }
        setIsLoading(false)
    }

    const fetchData = async () => {
        setIsLoading(true)
        setQuizzes([])
        setForms([])
        await getAnswers()
        await getForms()
    }

    useEffect(() => {
        formattedQuizzes()
    }, [formAnswers, forms])

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [isOffline])
    )

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <ScrollViewStyled>
                {quizzes.map((quiz) => {
                    const formData = quiz.flexible_form_version.data
                    const iconName = getQuizIconName(quiz)

                    if (!formData?.visible) {
                        return null
                    }
                    return (
                        <Button
                            key={quiz.id}
                            onPress={() =>
                                navigation.navigate('Quiz', { quiz })
                            }
                            disabled={
                                iconName === 'check-square' ||
                                iconName === 'lock'
                            }
                        >
                            <Box>
                                <IconWrapper>
                                    <Feather
                                        name={iconName}
                                        size={scale(26)}
                                        color='#348eac'
                                    />
                                </IconWrapper>
                                <InfoWrapper>
                                    <Title>{quiz.title}</Title>
                                    <Title>
                                        {quiz.percentage.toFixed(0)}/100
                                    </Title>
                                </InfoWrapper>
                            </Box>
                        </Button>
                    )
                })}
            </ScrollViewStyled>
        </Container>
    )
}

export default Quizzes
