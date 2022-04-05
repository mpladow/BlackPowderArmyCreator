import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonContainer = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  )
}

export default ButtonContainer

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4
    }
})