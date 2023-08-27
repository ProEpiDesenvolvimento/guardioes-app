import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Feather from 'react-native-vector-icons/Feather'
import ScreenLoader from '../../../components/ScreenLoader'
import { Help, Box, Button, IconWrapper, InfoWrapper, Title } from './styles'

import translate from '../../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { scale } from '../../../utils/scalling'
import {
    getFlexibleQuizzes,
    getFlexibleAnswers,
} from '../../../api/flexibleForms'

const Quizzes = ({ navigation }) => {
    const { token } = useUser()

    const [isLoading, setIsLoading] = useState(true)

    const [forms, setForms] = useState([])
    const [formAnswers, setFormAnswers] = useState([])
    const [quizzes, setQuizzes] = useState([])

    const isQuizDisabled = (quiz) => {
        const formData = quiz.flexible_form_version.data

        if (quiz.done) {
            return true
        }
        if (formData) {
            const startDate = moment(formData.start_date)
            const endDate = moment(formData.end_date)
            const now = moment()

            if (now.isBetween(startDate, endDate)) {
                return false
            }
            return true
        }
        return true
    }

    const getQuizIcon = (quiz) => {
        const formData = quiz.flexible_form_version.data

        if (quiz.done) {
            return (
                <Feather name='check-square' size={scale(26)} color='#348eac' />
            )
        }
        if (quiz.flexible_form_version?.data) {
            return <Feather name='unlock' size={scale(26)} color='#348eac' />
        }
        return <Feather name='lock' size={scale(26)} color='#348eac' />
    }

    const formattedQuizzes = () => {
        const newQuizzes = []

        forms.forEach((form, index) => {
            const answers = formAnswers.filter(
                (answer) => answer.flexible_form.id === form.id
            )

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

            newQuizzes.push({
                ...form,
                done: answers.length > 0,
            })
        })

        console.log(newQuizzes)
        setQuizzes(newQuizzes)
    }

    const getAnswers = async () => {
        const response = await getFlexibleAnswers(token)

        if (response.status === 200) {
            const { flexible_answers } = response.data

            setFormAnswers(flexible_answers)
        }
        setIsLoading(false)
    }

    const getForms = async () => {
        const response = await getFlexibleQuizzes(token)

        if (response.status === 200) {
            const { flexible_forms } = response.data

            setForms(flexible_forms)
        }
    }

    const fetchData = async () => {
        await getForms()
        await getAnswers()
    }

    useEffect(() => {
        if (formAnswers.length > 0 && forms.length > 0) {
            formattedQuizzes()
        }
    }, [formAnswers, forms])

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Help>
            {quizzes.map((quiz) => (
                <Button
                    key={quiz.id}
                    onPress={() => navigation.navigate('Quiz', { quiz })}
                    disabled={isQuizDisabled(quiz)}
                >
                    <Box>
                        <IconWrapper>
                            {getQuizIcon(quiz)}
                        </IconWrapper>
                        <InfoWrapper>
                            <Title>{quiz.title}</Title>
                        </InfoWrapper>
                    </Box>
                </Button>
            ))}
        </Help>
    )
}

export default Quizzes
