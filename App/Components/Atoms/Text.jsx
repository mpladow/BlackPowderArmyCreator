import { StyleSheet, Text as NativeText, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const Text = (props) => {
    const theme = useTheme();
  return (
    <View>
      <NativeText {...props} style={[{color: theme.colors.text}, props.style]}>{props.children}</NativeText>
    </View>
  )
}

export default Text

const styles = StyleSheet.create({})