import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { colors } from '../../Themes/Styling';

const Card = (props) => {
	const theme = useTheme();

	return (
		<View
			style={[
				styles.card,
				theme.dark
					? styles.containerDark
					: styles.containerLight,
			]}
		>
			{props.children}
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	card: {
		padding: 12,
		borderWidth:1,
		borderRadius: 16
	},
	containerLight: {
		borderColor: colors.black,
		backgroundColor: colors.offWhite1
	},
	containerDark: {
		borderColor: colors.offWhite1,
		backgroundColor: colors.black
	},
});
