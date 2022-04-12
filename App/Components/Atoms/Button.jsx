import { StyleSheet, View, Pressable } from 'react-native'
import Text from '../Atoms/Text';
import React from 'react'
import { useThemeContext } from '../../../Contexts/ThemeContext';
import { colors } from '../../../Constants/Styling';

const Button = (props) => {
    const theme = useThemeContext();
    const getStyle = () => {
        switch (props.type) {
            case "primary":
                if (theme.isDarkTheme){
                    return {backgroundColor: colors.infoDark}
                }
                else{
                    return { backgroundColor: colors.infoLight}
                }
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