import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItem = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.title}</Text>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        padding: 20,
    },
    
})