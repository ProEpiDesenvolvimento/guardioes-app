import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput, Button } from "react-native"
import { useSafeArea } from "react-native-safe-area-context";
import { ModalView } from "./styles"


Autocomplete = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(props.value)

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalView>
          <Text>{value}</Text>
          <TextInput onChangeText={setValue} value={value}></TextInput>
          {props.data.filter((data) => {
            return !(data.indexOf(value) === -1);
          }).map((data, index) => {
            return (
              <Pressable key={index} onPress={() => {
                setModalVisible(true)
                setValue(data)
                setModalVisible(false)
              }}>
                <Text>{data}</Text>
              </Pressable>
            )
          })}
        </ModalView>
        <Button
          onPress={() => setModalVisible(false)}
          title="Cancelar"
        />
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Pressione aqui!!</Text>
      </Pressable>
    </View>
  )
}

export default Autocomplete