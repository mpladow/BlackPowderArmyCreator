import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { commonStyles } from '../../Themes/Styling'

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
		flex: 1,
		// flexDirection: 'column',
		// alignItems: 'center',
		justifyContent: 'flex-start',
		width: '100%',
	},
});