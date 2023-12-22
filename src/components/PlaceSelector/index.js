import React, { useState } from 'react'
import { GOOGLE_CLOUD_API_KEY } from 'react-native-dotenv'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import {
    AutocompleteModal,
    CancelText,
    ModalView,
    AutocompleteText,
    AutocompleteButton,
    Container,
    ModalFade,
    CancelTouch,
} from '../Autocomplete/styles'

import translate from '../../locales/i18n'
import { scale } from '../../utils/scalling'

const PlaceSelector = ({
    placeholder,
    value,
    onChange,
    textCancel,
    disabled,
}) => {
    const [textInputValue, setTextInputValue] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const cancelText = textCancel || translate('selector.cancelButton')
    const placeholderInput = placeholder || translate('autocomplete.searchBar')

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <Container>
            <AutocompleteModal
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <ModalFade>
                    <ModalView>
                        <GooglePlacesAutocomplete
                            placeholder={placeholderInput}
                            onPress={(data) => {
                                const option = {
                                    value: data.description.split(',')[0],
                                    label: data.description,
                                }
                                onChange(data)
                                closeModal()
                            }}
                            query={{
                                key: GOOGLE_CLOUD_API_KEY,
                                language: translate('lang.code'),
                            }}
                            debounce={300}
                            styles={{
                                container: {
                                    flex: 0,
                                    width: '100%',
                                },
                                textInput: {
                                    backgroundColor: '#ffffff',
                                    borderRadius: scale(12),
                                    fontFamily: 'ArgentumSans',
                                    fontSize: scale(13),
                                    color: '#32323B',
                                    marginBottom: 0,
                                },
                                listView: {
                                    backgroundColor: '#fff',
                                    marginTop: scale(10),
                                    borderRadius: scale(12),
                                    maxHeight: '70%',
                                },
                                row: {
                                    backgroundColor: '#FFF',
                                    fontSize: scale(14),
                                    padding: scale(10),
                                },
                                description: {
                                    fontFamily: 'ArgentumSans',
                                    color: '#348EAC',
                                    fontSize: scale(14),
                                },
                                separator: {
                                    height: 0,
                                    backgroundColor: '#fff',
                                },
                            }}
                            preProcess={(data) => {
                                setTextInputValue(data)
                                return data
                            }}
                        />
                        {textInputValue !== '' ? (
                            <CancelTouch
                                onPress={() => {
                                    onChange(textInputValue)
                                    closeModal()
                                }}
                            >
                                <CancelText>Não encontrei na lista</CancelText>
                            </CancelTouch>
                        ) : null}
                        <CancelTouch onPress={() => closeModal()}>
                            <CancelText>{cancelText}</CancelText>
                        </CancelTouch>
                    </ModalView>
                </ModalFade>
            </AutocompleteModal>
            <AutocompleteButton
                onPress={() => setModalVisible(true)}
                disabled={disabled}
            >
                <AutocompleteText>{value}</AutocompleteText>
            </AutocompleteButton>
        </Container>
    )
}

export default PlaceSelector
