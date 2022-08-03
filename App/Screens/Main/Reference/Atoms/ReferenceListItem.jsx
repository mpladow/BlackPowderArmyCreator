import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import Text from '../../../../Components/Atoms/Text';
import { useThemeContext } from '../../../../Contexts/ThemeContext';
import { LightThemeCustom } from '../../../../Themes/themes';

const ReferenceListItem = ({name, onPress, icon}) => {
	const theme = useThemeContext();
  return (
      <Pressable style={[styles.item, {borderColor: theme.currentTheme.colors.border}]} onPress={() => onPress(name)}>
        <View>
          <Text>{name}</Text>
        </View>
        </Pressable>
      
  )
}

export default ReferenceListItem

const styles = StyleSheet.create({
    item: {
      // height: 150,
		// width: 150,
		margin: 8,
		flex: 1,
		height: 150,
		borderWidth: 2,
		borderColor: 'white',
        // backgroundColor: '#f9c2ff',
        padding: 20,
        // marginVertical: 8,
      },
})