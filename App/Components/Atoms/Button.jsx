import { StyleSheet, View, Pressable } from 'react-native'
import Text from '../Atoms/Text';
import React from 'react'
import { useThemeContext } from '../../Contexts/ThemeContext';
import { colors } from '../../Constants/Styling';
import { useTheme } from '@react-navigation/native';

const Button = (props) => {
    const theme = useTheme();
    const getStyle = () => {
        switch (props.type) {
            case "primary":
                if (theme.dark){
                    return {backgroundColor: colors.infoDark}
                }
                else{
                    return { backgroundColor: colors.infoLight}
                }
                break;
        
            default:
                break;
        }
    }
	   const getTextStyle = () => {
			switch (props.type) {
				case 'primary':
					if (theme.dark) {
						return {
							color:
								colors.offWhite1,
						};
					} else {
						return {
							color: colors.offWhite1,
						};
					}
					break;

				default:
					break;
			}
		};
  return (
		<Pressable onPress={props.onPress}>
			<View style={[styles.button, getStyle()]}>
				<Text style={[styles, getTextStyle()]}>
					{props.children}
				</Text>
			</View>
		</Pressable>
  );
}

export default Button

const styles = StyleSheet.create({
    button: {
        paddingVertical: 8,
        paddingHorizontal: 8*2,
        alignItems: 'center',
        borderRadius: 16
    },
    backgroundPrimary: {
backgroundColor: 'green'
    },
    backgroundSecondary: {

    }
})