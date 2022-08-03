import { Animated, Pressable, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Text from './Text';
import Heading from './Heading';
import { useTheme } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import ModalArmyOptions from '../../Screens/Main/ListCreator/ListCreator/Modals/ModalArmyOptions';

interface Props {
	id: string | number;
	title: string;
	description: string;
	onPress: () => void;
	minHeight?: number;
	margin?: number;
	style: any
}
const ListItem: React.FC<Props> = ({ id, title, description, onPress, minHeight, margin, style }) => {
	const theme = useTheme();
	const [toggleModalVisible, setToggleModalVisible] = useState(false);
	const onMenuButtonPressed = () => {
		setToggleModalVisible(!toggleModalVisible);
	};
	return (
		<>
			<Animated.View style={[style]}>
				<Pressable style={[styles.item, { height: minHeight, margin: margin }]} onPress={onPress}>
					<View style={{ flex: 1 }}>
						<Heading size='med'>{title}</Heading>
						<Text>{description}</Text>
					</View>
					<Pressable
						style={{
							flex: 1,
							alignItems: 'flex-end',
						}}
						onPress={onMenuButtonPressed}
					>
						<Entypo name='menu' size={24} color={theme.colors.text} />
					</Pressable>
				</Pressable>
			</Animated.View>
			<ModalArmyOptions id={id} onClosePress={() => setToggleModalVisible(false)} showModal={toggleModalVisible} />
		</>
	);
};

export default ListItem;

const styles = StyleSheet.create({
	item: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
});
