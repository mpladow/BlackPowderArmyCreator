import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomModal from '../../../../../Components/Atoms/ModalCustom';
import ModalCustom from '../../../../../Components/Atoms/ModalCustom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../../../Components/Atoms/Button';
import Card from '../../../../../Components/Atoms/Card';
import InputField from '../../../../../Components/Atoms/InputField';
import { Controller, useForm } from 'react-hook-form';
import { Commander } from '../../../../../Models/ArmyCreator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';

const EditBrigade = ({ route }) => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues: {
			BrigadeId: 0,
			DivisionId: 0,
			BrigadeName: '',
			Commander: undefined as Commander,
		},
	});
	const armyContext = useArmyContext();

	const [showCommanderModal, setShowCommanderModal] = useState(false);

	const [currentCommander, setCurrentCommander] = useState({} as Commander);
	const [saveButtonLabel, setSaveButtonLabel] = useState('Create Brigade');

	useEffect(() => {
		if (route.params && route.params?.BrigadeId && route.params?.DivisionId) {
			let _brigId = route.params.BrigadeId;
			let _divId = route.params.DivisionId;
			let _brigade = armyContext.getBrigadeById(_brigId, _divId);
			console.log(_brigade, 'editing brigade');
			setValue('BrigadeId', _brigId);
			setValue('DivisionId', _divId);
			setValue('BrigadeName', _brigade.name);
		} else {
			console.log('dfdf');
		}
	}, []);

	const onSelectBrigCommanderPress = () => {
		setShowCommanderModal(!showCommanderModal);
		//
	};

	const onSubmitHandler = () => {
		
	};

	const onErrorHandler = () => {};

	const onCancelPress = () => {
		setShowCommanderModal(false);
	};

	return (
		<KeyboardAwareScrollView>
			<View style={{ margin: 16}}>
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
					{getValues('Commander') === undefined ? (
						<Button onPress={onSelectBrigCommanderPress}>Select Commander</Button>
					) : (
						<View>
							<Text>
								{getValues('Commander').CommandRating} {getValues('Commander').CommanderSurname}
							</Text>
							<TouchableOpacity>
								<FontAwesome name='times' size={24} color='red' />
							</TouchableOpacity>
						</View>
					)}
				</View>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
				>
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
					</View>
					<View style={{ marginTop: 16 }}>
						<Button type='cancel' onPress={onCancelPress}>
							Cancel
						</Button>
					</View>
				</View>
			</View>
			<ModalCustom
				toggleModalVisible={() => setShowCommanderModal(!showCommanderModal)}
				showModal={showCommanderModal}
				heading={'Select Commander'}
			></ModalCustom>
		</KeyboardAwareScrollView>
	);
};

export default EditBrigade;

const styles = StyleSheet.create({});
