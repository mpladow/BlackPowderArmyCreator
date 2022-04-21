import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeContext } from '../../Contexts/ThemeContext'
import { useTheme } from '@react-navigation/native';

const ListItemSpacer = () => {
  const theme = useTheme()
  return (
    <View style={[styles.spacer, {backgroundColor: theme.colors.text}]}>
    </View>
  )
}

export default ListItemSpacer

const styles = StyleSheet.create({
    spacer:{
        height: 1,
        // backgroundColor: '#000'
    }
})