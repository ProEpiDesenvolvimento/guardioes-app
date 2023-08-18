import React, { useEffect, useState } from 'react'

import ScreenLoader from '../../../components/ScreenLoader'
import {
    Container,
    KeyboardScrollView,
    FormInline,
    FormLabel,
    NormalInput,
    Selector,
    DateSelector,
    CheckBoxStyled,
} from '../../../components/NormalForms'

import LoadingModal from '../../../components/Groups/LoadingModal'
import translate from '../../../locales/i18n'
import { useUser } from '../../../hooks/user'
import { getFlexibleAnswer } from '../../../api/events'

const EventoAnswer = ({ route }) => {
    const { token } = useUser()
    const { id } = route.params

    const [isLoading, setIsLoading] = useState(true)
    const [formVersion, setFormVersion] = useState({})
    const [answer, setAnswer] = useState({})
    const [formBuild, setFormBuild] = useState({})

    const [loadingAlert, setLoadingAlert] = useState(false)

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

                {formBuild.data?.map((question) => (
                    <FormInline key={question.field}>
                        <FormLabel>
                            {question.text}
                            {question.required ? '*' : ''}
                        </FormLabel>

                        {question.type === 'text' ||
                        question.type === 'number' ? (
                            <NormalInput
                                value={question.value}
                                editable={false}
                            />
                        ) : null}

                        {question.type === 'date' ? (
                            <DateSelector
                                placeholder={translate('dateSelector.format')}
                                date={question.value}
                                format='DD-MM-YYYY'
                                minDate='01-01-1918'
                                locale='pt-BR'
                                disabled
                            />
                        ) : null}

                        {question.type === 'select' ? (
                            <Selector
                                initValue={
                                    question.value
                                        ? question.value
                                        : translate('selector.label')
                                }
                                cancelText={translate('selector.cancelButton')}
                                disabled
                            />
                        ) : null}

                        {question.type === 'multiple'
                            ? question.options.map((option) => (
                                  <CheckBoxStyled
                                      key={option.id}
                                      title={option.label}
                                      checked={option.label === question.value}
                                      disabled
                                      full
                                  />
                              ))
                            : null}
                    </FormInline>
                ))}
            </KeyboardScrollView>

            <LoadingModal show={loadingAlert} />
        </Container>
    )
}

export default EventoAnswer
