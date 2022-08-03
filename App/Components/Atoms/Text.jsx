import { StyleSheet, Text as NativeText, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '../../Contexts/ThemeContext';

const Text = (props) => {
	const theme = useThemeContext();
	const getFontFamily = () => {
		let font = 'Poppins_400Regular';
		if (props.bold) {
			font = 'Poppins_600SemiBold';
		}
		if (props.italic) {
			font = 'NotoSans_400Regular_Italic';
		}

		return { fontFamily: font };
	};
	return (
		<>
			<NativeText
				{...props}
				style={[
					getFontFamily(),
					
						{color: theme.currentTheme?.colors.text},
					,
					props.style,
				]}
			>
				{props.children}
			</NativeText>
		</>
	);
};

export default Text;

const styles = StyleSheet.create({});
