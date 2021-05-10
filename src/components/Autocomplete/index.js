import React, { useState } from "react";
import { View, TextInput } from "react-native"
import {
  AutocompleteModal,
  CancelButton,
  ModalView,
  TextModalView,
  AutocompleteButton,
} from "./styles"


const Autocomplete = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(props.value)

  return (
    <View>
      <AutocompleteModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalView>
          <TextInput onChangeText={setValue} value={value} />
          {props.data.filter((data) => {
            return !(data.toLowerCase().indexOf(value.toLowerCase()) === -1);
          }).map((data, index) => {
            return (
              <TextModalView key={index} onPress={() => {
                props.onChange(data)
                setModalVisible(false)
              }}>
                {data.toUpperCase()}
              </TextModalView>
            )
          })}
        </ModalView>
        <CancelButton
          onPress={() => setModalVisible(false)}
          title="Cancelar"
        />
        <AutocompleteButton
          title={props.value}
          onPress={() => setModalVisible(true)}
        />
      </AutocompleteModal>
    </View>
  )
}

export default Autocomplete