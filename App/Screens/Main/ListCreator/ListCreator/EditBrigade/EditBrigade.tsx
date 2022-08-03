import { Pressable, StyleSheet, Touchable, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ModalCustom from '../../../../../Components/Atoms/ModalCustom';
import Button from '../../../../../Components/Atoms/Button';
import Card from '../../../../../Components/Atoms/Card';
import InputField from '../../../../../Components/Atoms/InputField';
import { Controller, useForm } from 'react-hook-form';
import { Brigade, Commander } from '../../../../../Models/ArmyCreator';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';
import { Picker } from '@react-native-picker/picker';
import { useTheme, useNavigation } from '@react-navigation/native';
import Text from '../../../../../Components/Atoms/Text';
import Container from '../../../../../Components/Atoms/Container';
import uuid from 'react-native-uuid';

const EditBrigade = ({ route }) => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		setError,
		clearErrors,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues: {
			BrigadeId: 0,
			DivisionId: 0,
			BrigadeName: '',
			Commander: undefined as Commander,
		},
	});
	const { currentCommander, setCurrentCommander, getBrigadeById, currentBrigade, setCurrentBrigade, addBrigade, updateBrigade, currentDivision } =
		useArmyContext();
	const nav = useNavigation();

	const [saveButtonLabel, setSaveButtonLabel] = useState('Create Brigade');
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	// include an menu option 
	useEffect(() => {
		nav.setOptions({
			headerRight: () => null,
		});
	}, []);
	useEffect(() => {
		if (route.params && route.params?.BrigadeId) {
			let _brigId = route.params.BrigadeId;
			let _divId = currentDivision.DivisionId;
			let _brigade: Brigade = getBrigadeById(_brigId, _divId);
			console.log(_brigade, 'editing brigade');
			setValue('BrigadeId', _brigId);
			setValue('DivisionId', _divId);
			setValue('BrigadeName', _brigade.BrigadeName);
			setSaveButtonLabel('Save Changes');
		} else {
			console.log('dfdf');
		}
	}, []);
	useEffect(() => {
		console.log(currentCommander, 'SET NEW COMMANDER');
		setValue('Commander', currentCommander);
		clearErrors('Commander.CommanderId');
	}, [currentCommander]);

	const onSelectBrigCommanderPress = () => {
		// setShowCommanderModal(!showCommanderModal);
		nav.navigate('EditCommander');
		//
	};

	const onSubmitHandler = (data) => {
		console.log(data, 'create or save new brigade');
		// if no id exists, create a new brigade, set current brigade,
		if (data.Commander == undefined) {
			setError('Commander.CommanderId', { message: 'You must select a commander' });
		}
		if (data.BrigadeId == '') {
			// save and add brigade and commander details
			addBrigade(data);
		} else {
			updateBrigade(data);
		}
		nav.goBack();
		// else update brigade and all units
	};

	const onErrorHandler = (data) => {
		console.log(data);
		if (getValues('Commander') == undefined) {
			setError('Commander.CommanderId', { message: 'You must select a commander' });
		}
	};

	const onCancelPress = () => {
		nav.goBack();
	};
	const onRemoveCommanderPress = () => {
		setShowConfirmationModal(false);
		console.log('remove commer');
		setCurrentCommander(undefined);
		setValue('Commander', undefined);
	};

	return (
		<Container>
			<View style={{ margin: 16 }}>
				<Card>
					<Controller
						render={({ field: { onChange, onBlur, value } }) => (
							<InputField
								labelName='Brigade Name'
								value={value}
								errors={errors.BrigadeName}
								placeholder={'e.g., 1st Brigade, 2nd Brigade'}
								onChangeText={onChange}
							/>
						)}
						name={'BrigadeName'}
						control={control}
						rules={{
							required: 'A brigade name is required',
						}}
					/>
				</Card>
			</View>
			<View style={{ padding: 16 }}>
				<View>
					{currentCommander == undefined ? (
						<Button onPress={onSelectBrigCommanderPress}>Select Commander</Button>
					) : (
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
							<Text style={{ fontSize: 16 }}>SR: {currentCommander.CommanderStaffRating}</Text>
							<Text>Gen. {currentCommander.CommanderFirstName}</Text>
							<View style={{ alignItems: 'flex-end' }}>
								<Pressable onPress={() => setShowConfirmationModal(true)} style={{ padding: 8 }}>
									<FontAwesome name='times' size={24} color='red' />
								</Pressable>
							</View>
						</View>
					)}
					{errors?.Commander?.CommanderId && <Text>{errors?.Commander?.CommanderId.message}</Text>}
				</View>
				{currentBrigade != undefined ? (
					<>
						<FlatList
							data={currentBrigade.Units}
							renderItem={({ item, index }) => (
								<View>
									<Text>{item.UnitName}</Text>
								</View>
							)}
						/>
						<Button type='default' onPress={() => console.log('ADD UNIT')}>
							Add Unit
						</Button>
					</>
				) : null}

				<View style={{ marginTop: 16 }}>
					<Button
						type='primary'
						// disabled={
						// 	isDirty
						// 		? false
						// 		: true
						// }
						onPress={handleSubmit(onSubmitHandler, onErrorHandler)}
					>
						{saveButtonLabel}
					</Button>
					<Button type='cancel' onPress={onCancelPress}>
						Cancel
					</Button>
				</View>
			</View>

			<ModalCustom
				toggleModalVisible={() => setShowConfirmationModal(!showConfirmationModal)}
				showModal={showConfirmationModal}
				heading={'Remove Commander'}
			>
				<View>
					<Text>Are you sure you want to remove {currentCommander?.CommanderFirstName} from command?</Text>
					<Button type='danger' onPress={() => onRemoveCommanderPress()}>
						Remove
					</Button>
					<Button type='cancel' onPress={() => setShowConfirmationModal(false)}>
						Cancel
					</Button>
				</View>
			</ModalCustom>
		</Container>
	);
};

export default EditBrigade;

const styles = StyleSheet.create({});
