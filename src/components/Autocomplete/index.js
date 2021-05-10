import React, { useState } from "react";
import { View, Text, Modal, Pressable, TextInput, Button } from "react-native"
import { ModalView, TextModalView } from "./styles"


const Autocomplete = (props) => {
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
          <TextInput onChangeText={setValue} value={value}/>
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
        <Button
          onPress={() => setModalVisible(false)}
          title="Cancelar"
        />
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>{props.value.toUpperCase()}</Text>
      </Pressable>
    </View>
  )
}

export default Autocomplete