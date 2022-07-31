import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ModalCustom from '../../../../../Components/Atoms/ModalCustom';
import { useTheme, useNavigation } from '@react-navigation/native';
import InputField from '../../../../../Components/Atoms/InputField';
import Button from '../../../../../Components/Atoms/Button';
import uuid from 'react-native-uuid';

import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from '../../../../../Components/Atoms/Card';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';
import { Division } from '../../../../../Models/ArmyCreator';

const EditDivision = (props) => {
	const [buttonLabel, setButtonLabel] = useState('Create Division');

	const nav = useNavigation();
	const armyContext = useArmyContext();
	const [focusedDivision, setFocusedDivision] = useState({} as Division);
	const [loading, setLoading] = useState(false);
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			ArmyId: 0,
			DivisionId: 0,
			DivisionName: '',
		},
	});
	useEffect(() => {
		if (
			props.route &&
			props.route.params &&
			props.route.params.DivisionId
		) {
			let _id = props.route.params.DivisionId;
			let _division = armyContext.getDivisionById(_id);
			setFocusedDivision(_division);
			setButtonLabel('Save Changes');
		} else {
			let _armyId = props.route.params.ArmyId;
			setValue('ArmyId', _armyId);

			setButtonLabel('Add Division');
		}
	}, [nav]);
	// useEffect(() => {
	// 	setValue('DivisionId', focusedDivision.DivisionId);
	// 	setValue('DivisionName', focusedDivision.DivisionName);
	// 	setValue('ArmyId', focusedDivision.ArmyId)
	// }, [focusedDivision]);

	const onSubmitHandler = (data: Division) => {
		setLoading(true);

		if (data.DivisionId == 0) {
			data.DivisionId = parseFloat(uuid.v4().toString());
			console.log(data, 'DivisionId new');
			armyContext.addDivision(data);
			setTimeout(() => {
				nav.goBack();
			}, 500);
		} else {
							console.log(
								data.DivisionId,
								'DivisionId edit'
							);

			armyContext.editDivision(data);
			setTimeout(() => {
				nav.navigate('ArmyDetails', {ArmyId: getValues('ArmyId')});
			}, 500);
		}

		setLoading(false);
	};

	const onErrorHandler = () => {};

	const onCancelPressHandler = () => {
		armyContext.removeDivisionFocus();
		nav.goBack();
	};

	return (
		<KeyboardAwareScrollView>
			<View style={{ margin: 16 }}>
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
								labelName='Division Name'
								value={value}
								errors={
									errors.DivisionName
								}
								placeholder={
									'e.g., 1st Div, 2nd Div'
								}
								onChangeText={
									onChange
								}
							/>
						)}
						name={'DivisionName'}
						control={control}
						rules={{
							required: 'An division name is required',
						}}
					/>
				</Card>
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
							onPress={
								onCancelPressHandler
							}
							disabled={loading}
						>
							Cancel
						</Button>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default EditDivision;

const styles = StyleSheet.create({});
