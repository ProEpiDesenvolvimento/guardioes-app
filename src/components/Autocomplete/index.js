import React, { useState } from 'react'

import Feather from 'react-native-vector-icons/Feather'
import {
    AutocompleteModal,
    CancelText,
    ModalView,
    TextModalView,
    AutocompleteText,
    AutocompleteButton,
    TextInputModal,
    Container,
    ModalFade,
    CancelTouch,
    TextInputView,
    TextInputIcon,
    ScrollToView,
    FlatModalView,
    NoResultText,
} from './styles'

import translate from '../../../locales/i18n'

const Autocomplete = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [value, setValue] = useState('')

    const data = props.data.filter((data) => {
        return !(data.label === undefined)
    })

    const textCancel = props.textCancel
        ? props.textCancel
        : translate('selector.cancelButton')

    const placeholder = props.placeholder
        ? props.placeholder
        : translate('autocomplete.searchBar')

    const closeModal = () => {
        setValue('')
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
                        <TextInputView>
                            <TextInputIcon />
                            <TextInputModal
                                onChangeText={setValue}
                                value={value}
                                placeholder={placeholder}
                            />
                        </TextInputView>
                        <ScrollToView>
                            <FlatModalView
                                data={data.filter((data) => {
                                    return !(
                                        data.label
                                            .toLowerCase()
                                            .indexOf(value.toLowerCase()) === -1
                                    )
                                })}
                                renderItem={({ item, index, separator }) => (
                                    <TextModalView
                                        key={index}
                                        onPress={() => {
                                            props.onChange(item)
                                            closeModal()
                                        }}
                                    >
                                        {item.label.toUpperCase()}
                                    </TextModalView>
                                )}
                                ListEmptyComponent={() => (
                                    <NoResultText>
                                        {translate(
                                            'autocomplete.noResult'
                                        ).toUpperCase()}
                                    </NoResultText>
                                )}
                            />
                        </ScrollToView>
                        <CancelTouch onPress={() => closeModal()}>
                            <CancelText>{textCancel}</CancelText>
                        </CancelTouch>
                    </ModalView>
                </ModalFade>
            </AutocompleteModal>
            <AutocompleteButton onPress={() => setModalVisible(true)}>
                <AutocompleteText>{props.value}</AutocompleteText>
            </AutocompleteButton>
        </Container>
    )
}

export default Autocomplete
