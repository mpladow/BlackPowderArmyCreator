import { StyleSheet,  View } from 'react-native'
import React, { useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import Text from './Text';
import { useTheme } from '@react-navigation/native';

const PickerCustom = (props) => {
		const theme = useTheme();
		useEffect(() => {
console.log(props.selectedValue)
		}, [])

  return (
		<View>
			{props.labelName && (
				<Text bold={true}>{props.labelName}</Text>
			)}
			<Picker
				{...props}
				style={{
					height: 50,
				}}
				mode='dropdown'
				selectedValue={props.selectedValue}
			>
				{props.options.map((item, index) => (
					<Picker.Item
						key={index.toString()}
						style={{
							color: theme.colors
								.text,
							backgroundColor:
								theme.colors
									.background,
						}}
						color={theme.colors.text}
						label={item.label}
						value={item.value}
					/>
				))}
			</Picker>
		</View>
  );
}

export default PickerCustom

const styles = StyleSheet.create({})