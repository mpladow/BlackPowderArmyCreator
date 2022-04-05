import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const Button = (props) => {
    const getStyle = () => {
        switch (props.type) {
            case "primary":
                return styles.backgroundPrimary
                break;
        
            default:
                break;
        }
    }
  return (
    <Pressable onPress={props.onPress}>
        <View style={[styles.button, getStyle()]}>
      <Text style={{color: 'white'}}>{props.children}</Text>
        </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 8
    },
    backgroundPrimary: {
backgroundColor: 'green'
    },
    backgroundSecondary: {

    }
})