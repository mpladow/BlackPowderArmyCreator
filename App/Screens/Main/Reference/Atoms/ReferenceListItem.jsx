import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import Text from '../../../../Components/Atoms/Text';

const ReferenceListItem = ({name, onPress, icon}) => {
  return (
      <Pressable style={styles.item} onPress={() => onPress(name)}>
        <View>
          <Text>{name}</Text>
        </View>
        </Pressable>
      
  )
}

export default ReferenceListItem

const styles = StyleSheet.create({
    item: {
      height: 150,
        // backgroundColor: '#f9c2ff',
        padding: 20,
        // marginVertical: 8,
      },
})