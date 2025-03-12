import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native'

const CheckBox = ({
  checked = false,
  iconRight = false,
  title,
  center = false,
  right = false,
  containerStyle,
  textStyle,
  wrapperStyle,
  onPress,
  onLongPress,
  checkedTitle,
  checkedColor = '#007AFF',
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.container, title && styles.containerHasTitle, containerStyle]}
    >
      <View style={[styles.wrapper, right && { justifyContent: 'flex-end' }, center && { justifyContent: 'center' }, wrapperStyle]}>
        {!iconRight && <View style={[styles.checkBox, checked && { backgroundColor: checkedColor }]} />}
        {title && (
          <Text style={[styles.title, textStyle]}>
            {checked ? checkedTitle || title : title}
          </Text>
        )}
        {iconRight && <View style={[styles.checkBox, checked && { backgroundColor: checkedColor }]} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 5,
    padding: 10,
  },
  containerHasTitle: {
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  title: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
})

export default CheckBox
