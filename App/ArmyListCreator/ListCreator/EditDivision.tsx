import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ModalCustom from '../../Components/Atoms/ModalCustom';
import { useTheme, useNavigation } from '@react-navigation/native';
import InputField from '../../Components/Atoms/InputField';
import Button from '../../Components/Atoms/Button';
import uuid from 'react-native-uuid';

import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Card from '../../Components/Atoms/Card';
import { useArmyContext } from '../../Contexts/ArmyListCreator/ArmyContext';
import { Division } from '../../Models/ArmyCreator';

const EditDivision = (props) => {
	const [buttonLabel, setButtonLabel] = useState('Create Division');

	const nav = useNavigation();
	const armyContext = useArmyContext();
	const [focusedDivision, setFocusedDivision] = useState({} as Division)
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			DivisionId: 0,
			DivisionName: '',
		},
	});
	useEffect(() => {
		if (props.route && props.route.params && props.route.params.DivisionId) {

			let div = armyContext.divisions.find(x => x.DivisionId == props.route.params.DivisionId)
			console.log(div, 'DIVISION')
			setFocusedDivision(div);
			armyContext.focusDivision(
				props.route.params.DivisionId
			);

			let id = props.route.params.DivisionId;
			setValue('DivisionId', div.DivisionId);
			setValue('DivisionName', div.DivisionName);
			setButtonLabel('Save Changes');
		} else {
			setButtonLabel('Add Division');
		}
	}, []);

	const onSubmitHandler = (data: Division) => {
		console.log(data, 'DIVSION');
		data.DivisionId = parseFloat(uuid.v4().toString());
		setValue('DivisionId', data.DivisionId);
		armyContext.addDivision(data);
		armyContext.removeDivisionFocus();
		nav.goBack();
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
