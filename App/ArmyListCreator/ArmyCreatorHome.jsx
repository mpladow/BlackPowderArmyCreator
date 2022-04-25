import {
	StyleSheet,
	View,
	FlatList,
	Modal,
	Alert,
	Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ListItem from '../Components/Atoms/ListItem';
import Button from '../Components/Atoms/Button';
import ButtonContainer from '../Components/Atoms/ButtonContainer';
import { FontAwesome } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { onChange } from 'react-native-reanimated';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ListItemSpacer from '../Components/Atoms/ListItemSpacer';
import Text from '../Components/Atoms/Text';
import CustomModal from '../Components/Atoms/ModalCustom';
import Container from '../Components/Atoms/TextContainer';
import Heading from '../Components/Atoms/Heading';
import { useNavigation } from '@react-navigation/native';
import InputField from '../Components/Atoms/InputField';
import { useArmyContext } from '../Contexts/ArmyContext';

const ArmyCreatorHome = () => {
	const [showArmyModal, setShowArmyModal] = useState(false);
	const [armyList, setArmyList] = useState([]);
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({ mode: 'onChange', defaultValues: { ArmyName: '' } });

	const nav = useNavigation();
	const armyContext = useArmyContext();

	const populateArmyList = () => {
		let list = armyContext.armies.map((item) => ({
			id: item.Id,
			armyName: item.ArmyName,
			armyNotes: item.ArmyNotes,
		}));
		setArmyList(list);
	};
	useEffect(() => {
		// populateArmyList();
	}, []);

	const addArmyHandler = () => {
		// open up a modal to add a new army
		nav.navigate('EditArmy', { id: null });
	};
	return (
		<View>
			<Container>
				<Text>
					A list of every single Black Powder army
					built. Cna include number of different
					armies
				</Text>
			</Container>
			<FlatList
				data={armyList}
				ListHeaderComponent={() => (
					<View
						style={{
							borderBottomWidth: 1,
							borderColor: '#000',
							paddingHorizontal: 20,
							paddingVertical: 10,
						}}
					>
						<Heading size={2}>
							All Armies
						</Heading>
					</View>
				)}
				ItemSeparatorComponent={() => (
					<ListItemSpacer />
				)}
				renderItem={(item) => (
					<ListItem
						title={item.item.armyList}
						description={
							item.item.armyNotes
						}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
			<View>
				<ButtonContainer>
					<Button
						type='primary'
						onPress={addArmyHandler}
					>
						Add Army
					</Button>
				</ButtonContainer>
			</View>
			<CustomModal
				heading='Create Army'
				toggleModalVisible={() =>
					setShowArmyModal(!showArmyModal)
				}
				showModal={showArmyModal}
			>
				<KeyboardAwareScrollView>
					<View style={styles.modalContent}>
						<Controller
							control={control}
							name='ArmyName'
							render={({
								field: {
									onChange,
									value,
									onBlur,
								},
							}) => (
								<InputField
									label='Army Name'
									placeholder='i.e., French I Corps'
									value={
										value
									}
									onChange={(
										val
									) =>
										onChange(
											val
										)
									}
								/>
							)}
						/>
					</View>
					<View style={styles.modalFooter}>
						<Button
							type='primary'
							onPress={() =>
								setShowArmyModal(
									false
								)
							}
						>
							Cancel
						</Button>
					</View>
				</KeyboardAwareScrollView>
			</CustomModal>
		</View>
	);
};

export default ArmyCreatorHome;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 22,
		paddingHorizontal: 4,
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 20,
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalHeader: {
		padding: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	modalContent: {
		padding: 4,
	},
	modalFooter: {
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});
