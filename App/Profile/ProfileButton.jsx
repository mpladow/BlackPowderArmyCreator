import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../Components/Atoms/Text';

const ProfileButton = (props) => {
  return (
    <Pressable onPress={props.onPress}>
    <Text>ML</Text>
  </Pressable>
  )
}

export default ProfileButton

const styles = StyleSheet.create({})