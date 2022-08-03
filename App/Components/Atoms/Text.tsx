import { StyleSheet, Text as NativeText, View } from 'react-native';
import React from 'react';
import { useThemeContext } from '../../Contexts/ThemeContext';

interface IProps {
bold?: boolean;
italic?: boolean;
style?: any;
}
const Text: React.FC<IProps> = ({bold, italic, children, style, ...props}) => {
	const theme = useThemeContext();
	const getFontFamily = () => {
		let font = 'Poppins_400Regular';
		if (bold) {
			font = 'Poppins_600SemiBold';
		}
		if (italic) {
			font = 'NotoSans_400Regular_Italic';
		}

		return { fontFamily: font };
	};
	return (
		<>
			<NativeText style={[getFontFamily(), { color: theme.currentTheme?.colors.text }, style]} {...props}>
				{children}
			</NativeText>
		</>
	);
};

export default Text;

const styles = StyleSheet.create({});
