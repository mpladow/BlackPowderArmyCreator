import { StyleSheet, View, Pressable } from 'react-native';
import Text from '../Atoms/Text';
import React from 'react';
import { useThemeContext } from '../../Contexts/ThemeContext';
import { colors } from '../../Themes/Styling';
import { useTheme } from '@react-navigation/native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const Button = (props) => {
	const theme = useTheme();
	const getStyle = () => {
		switch (props.type) {
			case 'primary':
				if (theme.dark) {
					return {
						backgroundColor:
							colors.infoDark,
					};
				} else {
					return {
						backgroundColor:
							colors.infoLight,
					};
				}
				break;
			case 'danger':
				if (theme.dark) {
					return {
						backgroundColor:
							colors.dangerDark,
					};
				} else {
					return {
						backgroundColor:
							colors.dangerLight,
					};
				}
				break;
			case 'cancel':
				if (theme.dark) {
					return {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: colors.offWhite1,
					};
				} else {
					return {
						backgroundColor: 'transparent',
						borderWidth: 1,
						borderColor: colors.black,
					};
				}
			default:
				break;
		}
	};
	const getTextStyle = () => {
		switch (props.type) {
			case 'primary':
				if (theme.dark) {
					return {
						color: colors.offWhite1,
					};
				} else {
					return {
						color: colors.offWhite1,
					};
				}
				break;
			case 'danger':
				if (theme.dark) {
					return {
						color: colors.offWhite1,
					};
				} else {
					return {
						color: colors.offWhite1,
					};
				}
				break;
			case 'cancel':
				if (theme.dark) {
					return {
						color: colors.offWhite1,
					};
				} else {
					return { color: colors.black };
				}

			default:
				break;
		}
	};
	return (
		<Pressable onPress={props.onPress} disabled={props.disabled}>
			<View
				style={[
					styles.button,
					getStyle(),
					props.disabled && styles.disabled,
				]}
			>
				<Text style={[getTextStyle()]}>
					{props.children}
				</Text>
			</View>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 8 * 2,
		alignItems: 'center',
		borderRadius: 16,
		marginBottom: 8
	},
	backgroundPrimary: {
		backgroundColor: 'green',
	},
	backgroundSecondary: {},
	disabled: {
		opacity: 0.5,
	},
});
