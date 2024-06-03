/* eslint-disable no-nested-ternary */
import React, { useState } from 'react'
import { Modal } from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import MultiSelector from '../MultiSelector'
import Autocomplete from '../Autocomplete'
import PlaceSelector from '../PlaceSelector'
import {
    ModalContainer,
    ModalBox,
    ModalTitle,
    ModalText,
    ButtonClose,
    ModalClose,
    FormInline,
    FormGroup,
    FormLabel,
    FormRequired,
    FormTip,
    NormalInput,
    Selector,
    CheckLabel,
    DateSelector,
    CheckBoxStyled,
} from '../NormalForms'

import translate from '../../locales/i18n'
import { scale } from '../../utils/scalling'
import { useUser } from '../../hooks/user'
import { stateOptionsBR, getCityBR } from '../../utils/brasil'
import { stateOptionsCV, getCityCV } from '../../utils/caboverde'

const FlexibleFormBuilder = ({
    formVersion,
    fV2,
    setFV2,
    isOffline,
    disabled,
    light,
}) => {
    const { user } = useUser()

    const [hintSelected, setHintSelected] = useState({})
    const [modalHint, setModalHint] = useState(false)

    const [state, setState] = useState('')

    const getMultiSelectorValue = (question) => {
        if (question.value) {
            const selected = question.value.split(',')
            return selected
        }
        return []
    }

    const setMultiSelectorValue = (question, selected) => {
        const value = selected.join(',')
        question.value = value
    }

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
        const place = option.structured_formatting?.main_text

        newFormVersion.data.questions.forEach((question) => {
            if (question.type === 'geo_location') {
                question.value = ''
                if (place || data?.length) {
                    if (place) {
                        question.value += `${place}, `
                    }
                    if (data.length) {
                        const cityState = []

                        for (let i = 1; i < data.length - 1; i += 1) {
                            cityState.push(data[i].value)
                        }
                        question.value += cityState.join(' , ').trim()
                    }
                } else {
                    question.value = option
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
                    <>
                        <Modal // Modal for Hint
                            animationType='fade'
                            transparent
                            visible={modalHint}
                            onRequestClose={() => {
                                setModalHint(!modalHint)
                            }}
                        >
                            <ModalContainer>
                                <ModalBox>
                                    <ModalTitle>
                                        {hintSelected.title}
                                    </ModalTitle>

                                    <ModalText>{hintSelected.text}</ModalText>

                                    <ButtonClose
                                        onPress={() => setModalHint(false)}
                                    >
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

                        <FormInline key={question.field}>
                            <FormGroup>
                                <FormLabel light={light}>
                                    {question.text}

                                    <FormRequired>
                                        {question.required ? ' *' : ''}
                                    </FormRequired>
                                </FormLabel>

                                {question.hint ? (
                                    <CheckLabel
                                        onPress={() => {
                                            setHintSelected(question.hint)
                                            setModalHint(true)
                                        }}
                                    >
                                        <Feather
                                            name='help-circle'
                                            size={scale(25)}
                                            color='#348EAC'
                                        />
                                    </CheckLabel>
                                ) : null}
                            </FormGroup>

                            {question.type === 'text' ||
                            question.type === 'number' ? (
                                <NormalInput
                                    value={question.value}
                                    onChangeText={(text) =>
                                        handleAnswer(question, text)
                                    }
                                    multiline={question.type === 'text'}
                                    editable={!disabled}
                                />
                            ) : null}

                            {question.type === 'date' ? (
                                <DateSelector
                                    placeholder={translate(
                                        'dateSelector.format'
                                    )}
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

                            {question.type === 'multi-select' ? (
                                <MultiSelector
                                    data={question.options}
                                    value={getMultiSelectorValue(question)}
                                    onChange={(options) => {
                                        setMultiSelectorValue(question, options)
                                    }}
                                    disabled={disabled}
                                />
                            ) : null}

                            {question.type === 'select' ? (
                                <Selector
                                    key={question.field}
                                    data={question.options}
                                    initValue={
                                        question.value
                                            ? question.value
                                            : translate('selector.label')
                                    }
                                    cancelText={translate(
                                        'selector.cancelButton'
                                    )}
                                    onChange={(option) =>
                                        handleAnswer(question, option)
                                    }
                                    disabled={disabled}
                                />
                            ) : null}

                            {question.type === 'multiple'
                                ? question.options.map((option) => (
                                      <CheckBoxStyled
                                          key={option.label}
                                          title={option.label}
                                          checked={
                                              question.value === option.value
                                          }
                                          onPress={() =>
                                              handleAnswer(question, option)
                                          }
                                          full
                                          disabled={disabled}
                                      />
                                  ))
                                : null}

                            {question.type === 'geo_state' ? (
                                <Autocomplete
                                    data={
                                        user.country === 'Brazil'
                                            ? stateOptionsBR
                                            : stateOptionsCV
                                    }
                                    value={question.value}
                                    onChange={(option) => {
                                        handleAnswer(question, option.key)
                                        setState(option.key)
                                    }}
                                    disabled={disabled}
                                />
                            ) : null}

                            {question.type === 'geo_city' ? (
                                <Autocomplete
                                    data={
                                        user.country === 'Brazil'
                                            ? getCityBR(state)
                                            : getCityCV(state)
                                    }
                                    value={question.value}
                                    onChange={(option) =>
                                        handleAnswer(question, option.key)
                                    }
                                    disabled={disabled}
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
                                    <>
                                        <PlaceSelector
                                            value={
                                                question.value.split(',')[0]
                                                    ? question.value.split(
                                                          ','
                                                      )[0]
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
                                        <FormTip
                                            light={light}
                                            style={{ alignSelf: 'center' }}
                                        >
                                            {question.value
                                                .split(', ')
                                                ?.slice(1)
                                                ?.join(', ')}
                                        </FormTip>
                                    </>
                                )
                            ) : null}
                        </FormInline>
                    </>
                )
            })}
        </>
    )
}

export default FlexibleFormBuilder
