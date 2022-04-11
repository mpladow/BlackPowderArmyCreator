import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'

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