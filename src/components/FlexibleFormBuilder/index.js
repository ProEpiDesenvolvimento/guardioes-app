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
    setFormVersion,
    disabled,
    light,
}) => {
    const handleAnswer = (question, value) => {
        const newFormVersion = { ...formVersion }

        newFormVersion.data.forEach((q) => {
            if (q.field === question.field) {
                q.value = value
            }
        })
        setFormVersion(newFormVersion)
    }

    const handlePlace = (option) => {
        const newFormVersion = { ...formVersion }
        const place = option.label.split(',')

        newFormVersion.data.forEach((question) => {
            if (question.type === 'geo_country') {
                if (place.length > 2) {
                    question.value = place[2].trim()
                } else if (place[1]) {
                    question.value = place[1].trim()
                } else if (place[0]) {
                    question.value = place[0].trim()
                }
            }
            if (question.type === 'geo_state') {
                if (place.length > 1) {
                    question.value = place[1].trim()
                } else {
                    question.value = ''
                }
            }
            if (question.type === 'geo_city') {
                if (place.length > 2) {
                    question.value = place[0].trim()
                } else {
                    question.value = ''
                }
            }
        })
        setFormVersion(newFormVersion)
    }

    return (
        <>
            {formVersion.data?.map((question) => (
                <FormInline key={question.field}>
                    <FormLabel light={light}>
                        {question.text}
                        {question.required ? ' *' : ''}
                    </FormLabel>

                    {question.type === 'text' || question.type === 'number' ? (
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
                                handleAnswer(question, option.value)
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
                                      handleAnswer(question, option.value)
                                  }
                                  full
                                  disabled={disabled}
                              />
                          ))
                        : null}

                    {question.type === 'geo_country' ? (
                        <NormalInput value={question.value} editable={false} />
                    ) : null}

                    {question.type === 'geo_state' ? (
                        <NormalInput value={question.value} editable={false} />
                    ) : null}

                    {question.type === 'geo_city' ? (
                        <NormalInput value={question.value} editable={false} />
                    ) : null}

                    {question.type === 'geo_location' ? (
                        <PlaceSelector
                            value={
                                question.value ? question.value : 'Selecionar'
                            }
                            placeholder={translate('autocomplete.searchBar')}
                            textCancel={translate('selector.cancelButton')}
                            onChange={(option) => {
                                handleAnswer(question, option.value)
                                handlePlace(option)
                            }}
                            disabled={disabled}
                        />
                    ) : null}
                </FormInline>
            ))}
        </>
    )
}

export default FlexibleFormBuilder
