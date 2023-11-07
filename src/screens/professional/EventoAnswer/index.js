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

const EventoAnswer = ({ route }) => {
    const { token } = useUser()
    const { answer } = route.params

    const [isLoading, setIsLoading] = useState(true)
    const [formVersion, setFormVersion] = useState({})
    const [formBuild, setFormBuild] = useState({})
    const [fV2, setFV2] = useState({})

    const buildAnswers = async () => {
        const newData = []

        formVersion.data.questions.forEach((q) => {
            answer.data.answers.forEach((a) => {
                if (q.field === a.field) {
                    newData.push({
                        ...q,
                        value: a.value,
                    })
                }
            })
        })

        const newFormVersion = { ...formVersion }
        newFormVersion.data.questions = newData

        setFormBuild(newFormVersion)
    }

    const getFlexibleFormVersion = async () => {
        const parsedData = JSON.parse(answer.flexible_form_version.data)
        answer.flexible_form_version.data = parsedData

        setFormVersion(answer.flexible_form_version)
        setFV2(answer.flexible_form_version)
        setIsLoading(false)
    }

    useEffect(() => {
        if (formVersion.data && answer.data) {
            buildAnswers()
        }
    }, [formVersion])

    useEffect(() => {
        getFlexibleFormVersion()
    }, [])

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
                    fV2={fV2}
                    setFV2={setFV2}
                    disabled
                />
            </KeyboardScrollView>
        </Container>
    )
}

export default EventoAnswer
