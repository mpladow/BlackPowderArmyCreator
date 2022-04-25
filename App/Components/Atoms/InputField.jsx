import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { DarkThemeCustom } from '../../Themes/themes';
import Text from './Text';

const InputField = (props) => {
	const theme = useTheme();
	return (
		<View style={{marginVertical: 4}}>
			{props.labelName && (
				<Text bold={true}>{props.labelName}</Text>
			)}
			<TextInput
				{...props}
				style={
					theme.dark
						? styles.darkTheme
						: styles.lightTheme
				}
				placeholderTextColor={
					theme.dark
						? styles.darkTheme
						: styles.lightTheme
				}
			/>
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	darkTheme: {
		color: DarkThemeCustom.colors.text,
	},
	lightTheme: {
		color: DarkThemeCustom.colors.text,
	},
});
