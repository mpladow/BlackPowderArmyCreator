import { StyleSheet, Text as NativeText, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { 
  NotoSans_400Regular,
  NotoSans_400Regular_Italic,
  NotoSans_700Bold,
  NotoSans_700Bold_Italic 
} from '@expo-google-fonts/noto-sans'
import { 
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from '@expo-google-fonts/poppins'
const Text = (props) => {
  
    const theme = useTheme();
  return (
    <>
      <NativeText {...props} style={[{color: theme.colors.text, fontFamily: 'Poppins_400Regular'}, props.style]}>{props.children}</NativeText>
    </>
  )
}

export default Text

const styles = StyleSheet.create({})