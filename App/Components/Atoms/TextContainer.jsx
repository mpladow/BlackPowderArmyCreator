import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '../../Constants/Styling'

const Container = (props) => {
  return (
    <View {...props} style={styles.container}>
      {props.children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
    container: {
        padding: commonStyles.padding, 
        marginVertical: commonStyles.margin
    }
})