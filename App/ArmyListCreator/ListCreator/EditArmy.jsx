import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../Components/Atoms/InputField';
import { useTheme, useNavigation } from '@react-navigation/native';
import Card from '../../Components/Atoms/Card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PickerCustom from '../../Components/Atoms/PickerCustom';
import Button from '../../Components/Atoms/Button';

const EditArmy = (props) => {
	const [buttonLabel, setButtonLabel] = useState('Create Army');
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const nav = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm({
		defaultValues: {
			Id: 0,
			ArmyName: '',
			ArmyNotes: '',
			EraTemplate: '',
		},
	});

	const onCancelPress = () => {
		// prompt cancel if form is dirty
		nav.goBack();
	}
	const onSubmitHandler = (data) => {
		console.log(data, 'DATA')
	}
	const onErrorHandler = (error) => {
		console.log(error, 'ERROR')
	}

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
								onChangeText={
									onChange
								}
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
							disabled={
								isDirty
									? false
									: true
							}
							onPress={
								handleSubmit(
									onSubmitHandler,
									onErrorHandler
								)

							}
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
