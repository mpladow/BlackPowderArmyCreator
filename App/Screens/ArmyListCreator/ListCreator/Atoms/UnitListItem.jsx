import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from '../../../../Components/Atoms/Text';
import { useTheme } from '@react-navigation/native';
import {
	MaterialCommunityIcons,
	Foundation,
	AntDesign,
} from '@expo/vector-icons';


const UnitListItem = ({ unit, onDeletePress, editMode }) => {
	const theme = useTheme();

	return (
		<View
			style={{
				justifyContent: 'center',
				borderTopWidth: 1,
				borderBottomWidth: 1,
				paddingVertical: 4,
				borderColor: theme.colors.text,
			}}
		>
			<Text bold={true}>{unit.UnitName}</Text>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Text>{unit.Type}</Text>
				<View
					style={{
						flexDirection: 'column',
						flex: 1,
						alignItems: 'center',
					}}
				>
					<MaterialCommunityIcons
						name='sword-cross'
						size={16}
						color={theme.colors.text}
					/>
					<Text>{unit.HandToHand}</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						flex: 1,
						alignItems: 'center',
					}}
				>
					<Foundation
						name='target'
						size={16}
						color={theme.colors.text}
					/>
					<Text>{unit.Shooting}</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						flex: 1,
						alignItems: 'center',
					}}
				>
					<MaterialCommunityIcons
						name='brain'
						size={16}
						color={theme.colors.text}
					/>
					<Text>{unit.Morale}+</Text>
				</View>
				<View
					style={{
						flexDirection: 'column',
						flex: 1,
						alignItems: 'center',
					}}
				>
					<AntDesign
						name='hearto'
						size={16}
						color={theme.colors.text}
					/>
					<Text>{unit.Stamina}</Text>
				</View>
				{editMode && (
					<Pressable
						style={{
							flexDirection: 'column',
							flex: 1,
							alignItems: 'center',
						}}
						onPress={onDeletePress}
					>
						<AntDesign
							name='delete'
							size={18}
							color='red'
						/>
					</Pressable>
				)}
			</View>
			<View>
				<Text italic>Special Rules</Text>
			</View>
		</View>
	);
};

export default UnitListItem;

const styles = StyleSheet.create({});
