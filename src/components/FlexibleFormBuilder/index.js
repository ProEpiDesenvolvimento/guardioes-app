import React, { useEffect, useState } from 'react'

import {
    FormInline,
    FormLabel,
    NormalInput,
    Selector,
    DateSelector,
    CheckBoxStyled,
} from '../NormalForms'

import translate from '../../locales/i18n'

const FlexibleFormBuilder = ({ formVersion, setFormVersion, light }) => {
    const handleAnswer = (question, value) => {
        const newFormVersion = { ...formVersion }

        newFormVersion.data.forEach((q) => {
            if (q.field === question.field) {
                q.value = value
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
                              />
                          ))
                        : null}
                </FormInline>
            ))}
        </>
    )
}

export default FlexibleFormBuilder
