import React, { useEffect, useState } from 'react'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
} from '../../../components/NormalForms'
import FlexibleFormBuilder from '../../../components/FlexibleFormBuilder'

import { useUser } from '../../../hooks/user'
import { getFlexibleAnswer } from '../../../api/events'

const EventoAnswer = ({ route }) => {
    const { token } = useUser()
    const { id } = route.params

    const [isLoading, setIsLoading] = useState(true)
    const [formVersion, setFormVersion] = useState({})
    const [answer, setAnswer] = useState({})
    const [formBuild, setFormBuild] = useState({})

    const buildAnswers = async () => {
        const newData = []

        formVersion.data.forEach((q) => {
            answer.data.forEach((a) => {
                if (q.field === a.field) {
                    newData.push({
                        ...q,
                        value: a.value,
                    })
                }
            })
        })

        const newFormVersion = { ...formVersion }
        newFormVersion.data = newData

        setFormBuild(newFormVersion)
    }

    const getAnswer = async () => {
        const response = await getFlexibleAnswer(id, token)

        if (response.status === 200) {
            const flexibleAnswer = response.data.flexible_answer

            const parsedData = JSON.parse(flexibleAnswer.data)
            flexibleAnswer.data = parsedData

            if (flexibleAnswer.flexible_form_version) {
                const parsedVersionData = JSON.parse(
                    flexibleAnswer.flexible_form_version.data
                )
                flexibleAnswer.flexible_form_version.data = parsedVersionData

                setAnswer(flexibleAnswer)
                setFormVersion(flexibleAnswer.flexible_form_version)
            }
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAnswer()
    }, [])

    useEffect(() => {
        if (formVersion.data && answer.data) {
            buildAnswers()
        }
    }, [formVersion])

    if (isLoading) {
        return <ScreenLoader />
    }

    return (
        <Container>
            <KeyboardScrollView keyboardShouldPersistTaps='always'>
                <FormInline>
                    <FormLabel>
                        Respondido por: {answer.user?.user_name}
                    </FormLabel>
                </FormInline>

                <FlexibleFormBuilder
                    formVersion={formBuild}
                    setFormVersion={setFormBuild}
                    disabled
                />
            </KeyboardScrollView>
        </Container>
    )
}

export default EventoAnswer
