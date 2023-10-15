/* eslint-disable no-nested-ternary */
import React from 'react'

import PlaceSelector from '../PlaceSelector'
import {
    FormInline,
    FormLabel,
    NormalInput,
    Selector,
    DateSelector,
    CheckBoxStyled,
} from '../NormalForms'

import translate from '../../locales/i18n'

const FlexibleFormBuilder = ({
    formVersion,
    fV2,
    setFV2,
    isOffline,
    disabled,
    light,
}) => {
    const handleAnswer = (question, option) => {
        const newFormVersion = { ...fV2 }

        newFormVersion.data.questions.forEach((q) => {
            if (q.field === question.field) {
                q.value = option.value ? option.value : option
            }
            if (q.dependent_question === question.id) {
                if (q.dependent_operation === 'filter') {
                    const originalQuestion = formVersion.data.questions.find(
                        (oq) => oq.id === q.id
                    )
                    q.options = originalQuestion.options.filter((op) => {
                        const { relation } = option
                        return op.relation === relation || op.relation === 'all'
                    })
                    q.value = ''
                }
                if (q.dependent_operation === 'show') {
                    const required = q.dependent_value.includes(option.value)
                    q.hidden = !required
                    q.required = required
                    q.value = ''
                }
            }
        })
        setFV2(newFormVersion)
    }

    const handlePlace = (option) => {
        const newFormVersion = { ...fV2 }

        const data = option.terms
        const place = option.structured_formatting.main_text

        newFormVersion.data.questions.forEach((question) => {
            if (question.type === 'geo_country') {
                if (data.length) {
                    question.value = data[data.length - 1].value
                }
            }
            if (question.type === 'geo_city_state') {
                if (data.length) {
                    let cityState = []

                    for (let i = 1; i < data.length - 1; i += 1) {
                        cityState.push(data[i].value)
                    }
                    question.value = cityState.join(' / ').trim()
                }
            }
            if (question.type === 'geo_location') {
                if (place) {
                    question.value = place
                }
            }
        })
        setFV2(newFormVersion)
    }

    return (
        <>
            {fV2.data?.questions?.map((question) => {
                if (question.hidden) {
                    return null
                }
                return (
                    <FormInline key={question.field}>
                        <FormLabel light={light}>
                            {question.text}
                            {question.required ? ' *' : ''}
                        </FormLabel>

                        {question.type === 'text' ||
                        question.type === 'number' ? (
                            <NormalInput
                                value={question.value}
                                onChangeText={(text) =>
                                    handleAnswer(question, text)
                                }
                                editable={!disabled}
                            />
                        ) : null}

                        {question.type === 'date' ? (
                            <DateSelector
                                placeholder={translate('dateSelector.format')}
                                date={question.value}
                                format='DD-MM-YYYY'
                                minDate='01-01-1918'
                                locale='pt-BR'
                                confirmBtnText={translate(
                                    'dateSelector.confirmButton'
                                )}
                                cancelBtnText={translate(
                                    'dateSelector.cancelButton'
                                )}
                                onDateChange={(date) =>
                                    handleAnswer(question, date)
                                }
                                disabled={disabled}
                            />
                        ) : null}

                        {question.type === 'select' ? (
                            <Selector
                                data={question.options}
                                initValue={
                                    question.value
                                        ? question.value
                                        : translate('selector.label')
                                }
                                cancelText={translate('selector.cancelButton')}
                                onChange={(option) =>
                                    handleAnswer(question, option)
                                }
                                disabled={disabled}
                            />
                        ) : null}

                        {question.type === 'multiple'
                            ? question.options.map((option) => (
                                  <CheckBoxStyled
                                      key={option.id}
                                      title={option.label}
                                      checked={question.value === option.value}
                                      onPress={() =>
                                          handleAnswer(question, option)
                                      }
                                      full
                                      disabled={disabled}
                                  />
                              ))
                            : null}

                        {question.type === 'geo_country' ? (
                            <NormalInput
                                value={question.value}
                                editable={false}
                            />
                        ) : null}

                        {question.type === 'geo_city_state' ? (
                            <NormalInput
                                value={question.value}
                                editable={false}
                            />
                        ) : null}

                        {question.type === 'geo_location' ? (
                            isOffline ? (
                                <NormalInput
                                    value={question.value}
                                    onChangeText={(text) =>
                                        handleAnswer(question, text)
                                    }
                                    editable={!disabled}
                                />
                            ) : (
                                <PlaceSelector
                                    value={
                                        question.value
                                            ? question.value
                                            : 'Selecionar'
                                    }
                                    placeholder={translate(
                                        'autocomplete.searchBar'
                                    )}
                                    textCancel={translate(
                                        'selector.cancelButton'
                                    )}
                                    onChange={(option) => {
                                        handlePlace(option)
                                    }}
                                    disabled={disabled}
                                />
                            )
                        ) : null}
                    </FormInline>
                )
            })}
        </>
    )
}

export default FlexibleFormBuilder
