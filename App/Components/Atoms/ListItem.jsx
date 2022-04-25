import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from './Text'
import Heading from './Heading';

const ListItem = (props) => {
  return (
		<View style={styles.item}>
			<Heading size='med'>{props.title}</Heading>
			<Text>{props.description}</Text>
		</View>
  );
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        padding: 20,
    },
    
})