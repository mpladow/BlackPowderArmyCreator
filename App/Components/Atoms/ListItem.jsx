import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListItem = (props) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        borderWidth: 1,
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    
})