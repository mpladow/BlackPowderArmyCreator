import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItemSpacer = () => {
  return (
    <View style={styles.spacer}>
    </View>
  )
}

export default ListItemSpacer

const styles = StyleSheet.create({
    spacer:{
        height: 1,
        backgroundColor: '#000'
    }
})