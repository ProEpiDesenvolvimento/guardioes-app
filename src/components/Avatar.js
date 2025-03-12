import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
}

const Avatar = ({
  onPress,
  onLongPress,
  size = 'small',
  source,
  rounded,
  title,
  style,
}) => {
  const Component = onPress || onLongPress ? TouchableOpacity : View
  const dimension = typeof size === 'number' ? size : avatarSizes[size]

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, { width: dimension, height: dimension, borderRadius: rounded ? dimension / 2 : 0 }, style]}
    >
      {source ? (
        <Image source={source} style={[styles.image, { borderRadius: rounded ? dimension / 2 : 0 }]} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Component>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
})

export default Avatar