import React, { useState } from "react";
import { View, Text } from "react-native"
import translate from '../../../locales/i18n'
import {
  AutocompleteModal,
  CancelText,
  ModalView,
  TextModalView,
  AutocompleteText,
  TextInputModal,
  ScrollModalView,
  ModalFade,
  CancelTouch,
} from "./styles"


const Autocomplete = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(props.value);
  const data = props.data.filter((data) => {
    return !(data.label === undefined)
  })
  const textCancel = (props.textCancel ? props.textCancel : translate('selector.cancelButton'));
  const placeholder = (props.placeholder ? props.placeholder : translate('autocomplete.searchBar'))

  return (
    <View>
      <AutocompleteModal
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}>
        <ModalFade>
          <ModalView>
            <TextInputModal onChangeText={setValue} value={value} placeholder={placeholder} />
            <ScrollModalView>
              {data.filter((data) => {
                if (data.label === undefined) return false
                return !(data.label.toLowerCase().indexOf(value.toLowerCase()) === -1);
              }).map((data, index) => {
                return (
                  <TextModalView key={index} onPress={() => {
                    props.onChange(data.label)
                    setModalVisible(false)
                  }}>
                    {data.label.toUpperCase()}
                  </TextModalView>
                )
              })}
            </ScrollModalView>
            <CancelTouch onPress={() => setModalVisible(false)}>
              <CancelText>{textCancel}</CancelText>
            </CancelTouch>
          </ModalView>
        </ModalFade>
      </AutocompleteModal>
      <AutocompleteText
        onPress={() => setModalVisible(true)}
      >{props.value}</AutocompleteText>
    </View>
  )
}

export default Autocomplete