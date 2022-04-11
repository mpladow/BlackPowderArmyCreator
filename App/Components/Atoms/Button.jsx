import { StyleSheet, View, Pressable } from 'react-native'
import Text from '../Atoms/Text';
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
      <Text>{props.children}</Text>
        </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 8*2,
        alignItems: 'center',
        borderRadius: 16
    },
    backgroundPrimary: {
backgroundColor: 'green'
    },
    backgroundSecondary: {

    }
})