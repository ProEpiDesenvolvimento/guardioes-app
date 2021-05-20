import React, { useState } from "react";
import translate from '../../../locales/i18n'
import Feather from 'react-native-vector-icons/Feather'
import {
  AutocompleteModal,
  CancelText,
  ModalView,
  TextModalView,
  AutocompleteText,
  AutocompleteButton,
  TextInputModal,
  ScrollModalView,
  Container,
  ModalFade,
  CancelTouch,
  TextInputView,
  TextInputIcon,
  ScrollToView,
} from "./styles"

Feather.loadFont()


const Autocomplete = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const data = props.data.filter((data) => {
    return !(data.label === undefined)
  })
  const textCancel = (props.textCancel ? props.textCancel : translate('selector.cancelButton'));
  const placeholder = (props.placeholder ? props.placeholder : translate('autocomplete.searchBar'))

  function closeModal() {
    setValue('')
    setModalVisible(false)
  }

  return (
    <Container>
      <AutocompleteModal
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <ModalFade>
          <ModalView>
            {/*<TextInputModal
              onChangeText={setValue}
              value={value}
              placeholder={placeholder}
            />*/}
            <TextInputView>
              <TextInputIcon />
              <TextInputModal
                onChangeText={setValue}
                value={value}
                placeholder={placeholder}
              />
            </TextInputView>
            <ScrollToView>
              <ScrollModalView>
                {data.filter((data) => {
                  if (data.label === undefined) return false
                  return !(data.label.toLowerCase().indexOf(value.toLowerCase()) === -1);
                }).map((data, index) => {
                  return (
                    <TextModalView key={index} onPress={() => {
                      props.onChange(data)
                      closeModal()
                    }}>
                      {data.label.toUpperCase()}
                    </TextModalView>
                  )
                })}
              </ScrollModalView>
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