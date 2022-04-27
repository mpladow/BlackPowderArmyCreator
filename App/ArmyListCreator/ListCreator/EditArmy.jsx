import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../Components/Atoms/InputField';
import { useTheme, useNavigation } from '@react-navigation/native';
import Card from '../../Components/Atoms/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PickerCustom from '../../Components/Atoms/PickerCustom';
import Button from '../../Components/Atoms/Button';
import uuid from 'react-native-uuid';
import { useArmyContext } from '../../Contexts/ArmyContext';

const EditArmy = (props) => {
	const [buttonLabel, setButtonLabel] = useState('Create Army');
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const nav = useNavigation();
	const armyContext = useArmyContext();
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues: {
			Id: 0,
			ArmyName: '',
			ArmyNotes: '',
			EraTemplate: 'napoleonics',
		},
	});

	useEffect(() => {
		console.log('getting route');
		if (props.route.params.Id) {
			let id = props.route.params.Id;
			setValue('Id', id);
			let army = armyContext.getArmyById(id);
			setValue('ArmyName', army.ArmyName);
			setValue('ArmyNotes', army.ArmyNotes);
			setValue('EraTemplate', army.EraTemplate);
			setButtonLabel('Save Changes');
		}
	}, []);

	const onCancelPress = () => {
		// prompt cancel if form is dirty
		nav.goBack();
	};
	const onSubmitHandler = (data) => {
		console.log(data, 'DATA');

		if (data.Id === 0) {
			//add
			data.Id = uuid.v4();
			// save army
			armyContext.addArmy(data);
		} else {
			//edit
			armyContext.editArmy(data);
		}
		nav.navigate('ArmyDetails', { Id: data.Id });
	};
	const onErrorHandler = (error) => {
		console.log(error, 'ERROR');
	};

	return (
		<KeyboardAwareScrollView>
			<Image
				resizeMode='cover'
				source={require('../../../assets/images/banner_napoleon.jpg')}
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
						rules={{ required: true }}
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
								onChangeText={(val) => {
									onChange(val);
									console.log(
										getValues(), 'values'
									);
								}}
							/>
						)}
						name={'ArmyNotes'}
						control={control}
						rules={{ required: true }}
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
							options={[
								{
									label: 'Napoleonics',
									value: 'napoleonics',
								},
								{
									label: 'Civil War',
									value: 'civil_war',
								},
							]}
						/>
					)}
					name={'EraTemplate'}
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
