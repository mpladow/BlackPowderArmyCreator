import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import Text from '../../../../../Components/Atoms/Text';
import Button from '../../../../../Components/Atoms/Button';
import CustomModal from '../../../../../Components/Atoms/ModalCustom';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';

const ModalArmyOptions = ({ id, onClosePress, showModal }) => {
	const nav = useNavigation();
	const armyContext = useArmyContext();

	const onEditPress = () => {
		onClosePress();
		nav.navigate('EditArmy', { DivisionId: id });
	};
	const onDeletePress = () => {
		console.log(id, 'ID');
		return Alert.alert(
			'Delete Division',
			`Are you sure you want to delete this army of id ${id}?`,
			[
				{
					text: 'Delete',
					onPress: () => {
						onClosePress();
						armyContext.deleteDivision(id);
					},
				},
				{
					text: 'Cancel',
					onPress: () => {
						onClosePress();
					},
				},
			]
		);
	};

	return (
		<>
			<CustomModal
				heading='Options'
				showModal={showModal}
				toggleModalVisible={onClosePress}
			>
				<View
					style={
						{
							// flex: 1,
							// flexDirection: 'column',
							// justifyContent: 'space-between',
						}
					}
				>
					<View style={{ marginTop: 16 }}>
						<Button
							type='primary'
							onPress={onEditPress}
						>
							Edit Division
						</Button>
					</View>
					<View style={{ marginTop: 16 }}>
						<Button
							type='danger'
							onPress={onDeletePress}
						>
							Delete
						</Button>
					</View>
				</View>
			</CustomModal>
		</>
	);
};

export default ModalArmyOptions;

const styles = StyleSheet.create({});
