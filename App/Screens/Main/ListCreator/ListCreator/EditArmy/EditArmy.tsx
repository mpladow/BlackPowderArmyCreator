import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../../../../Components/Atoms/InputField';
import { useTheme, useNavigation } from '@react-navigation/native';
import Card from '../../../../../Components/Atoms/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PickerCustom from '../../../../../Components/Atoms/PickerCustom';
import Button from '../../../../../Components/Atoms/Button';
import uuid from 'react-native-uuid';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';
import { useCreatorContext } from '../../../../../Contexts/ArmyListCreator/CreatorContext';
import { Army } from '../../../../../Models/ArmyCreator';

const EditArmy = (props) => {
	const [buttonLabel, setButtonLabel] = useState('Create Army');
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const nav = useNavigation();
	const armyContext = useArmyContext();
	const creatorContext = useCreatorContext();
	const [eraDropdown, setEraDropdown] = useState([]);
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues: {
			ArmyId: 0,
			ArmyName: '',
			ArmyNotes: '',
			EraTemplateId: 1,
		},
	});

	useEffect(() => {
		if (props.route.params.ArmyId) {
			let id = props.route.params.ArmyId;
			setValue('ArmyId', id);
			let army = armyContext.getArmyById(id);
			setValue('ArmyName', army.ArmyName);
			setValue('ArmyNotes', army.ArmyNotes);
			setValue('EraTemplateId', army.EraTemplateId);
			setButtonLabel('Save Changes');
		} else {
			if (!armyContext.focusedArmy) {
				setValue(
					'ArmyName',
					armyContext.focusedArmy?.ArmyName
				);
				setValue(
					'ArmyNotes',
					armyContext.focusedArmy?.ArmyNotes
				);
				setValue(
					'EraTemplateId',
					armyContext.focusedArmy?.EraTemplateId
				);
				setButtonLabel('Save Changes');
			}
		}

		setEraDropdown(creatorContext.getEraDropdown);
	}, []);

	const onCancelPress = () => {
		// prompt cancel if form is dirty
		nav.goBack();
	};
	const onSubmitHandler = async (data: Army) => {
		console.log(data, 'DATA');

		if (data.ArmyId == 0) {
			console.log('ADDING ARMY');
			//add
			data.ArmyId = Math.random() * 1000;
			setValue('ArmyId', data.ArmyId);

			// save army
			armyContext.addArmy(data);
		} else {
			console.log('EDITING ARMY');
			//edit
			armyContext.editArmy(data);
		}
		setTimeout(() => {
			nav.navigate('ArmyDetails', {
				ArmyId: getValues('ArmyId'),
			});
		}, 1000);
	};

	const onErrorHandler = (error) => {
		console.log(error, 'ERROR');
		console.log(errors.ArmyName, 'All errors');
	};

	return (
		<KeyboardAwareScrollView>
			<Image
				resizeMode='cover'
				source={require('../../../../../../assets/images/banner_napoleon.jpg')}
				style={[{ height: 170, width: null }]}
			/>
			<View style={{ margin: 16, marginTop: -15 }}>
				<Card>
					<Controller
						render={({
							field: {
								onChange,
								onBlur,
								value,
							},
						}) => (
							<InputField
								labelName='Army Name'
								value={value}
								errors={
									errors.ArmyName
								}
								placeholder={
									'e.g., 1st Div, 2nd Div'
								}
								onChangeText={
									onChange
								}
							/>
						)}
						name={'ArmyName'}
						control={control}
						rules={{
							required: 'An army name is required',
						}}
					/>
					<Controller
						render={({
							field: {
								onChange,
								onBlur,
								value,
							},
						}) => (
							<InputField
								labelName='Army Notes'
								value={value}
								placeholder={
									'e.g., French 1812, British Waterloo'
								}
								onChangeText={(
									val
								) => {
									onChange(
										val
									);
									console.log(
										getValues(),
										'values'
									);
								}}
							/>
						)}
						name={'ArmyNotes'}
						control={control}
					/>
				</Card>
			</View>
			<View style={{ padding: 16 }}>
				<Controller
					render={({
						field: {
							onChange,
							onBlur,
							value,
						},
					}) => (
						<PickerCustom
							labelName='Era'
							selectedValue={value}
							onValueChange={(
								itemValue,
								itemIndex
							) =>
								onChange(
									itemValue
								)
							}
							options={eraDropdown}
						/>
					)}
					name={'EraTemplateId'}
					control={control}
				/>
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
							onPress={handleSubmit(
								onSubmitHandler,
								onErrorHandler
							)}
						>
							{buttonLabel}
						</Button>
					</View>
					<View style={{ marginTop: 16 }}>
						<Button
							type='cancel'
							onPress={onCancelPress}
						>
							Cancel
						</Button>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default EditArmy;

const styles = StyleSheet.create({
	image: {
		flex: 1,
		justifyContent: 'center',
	},
});
