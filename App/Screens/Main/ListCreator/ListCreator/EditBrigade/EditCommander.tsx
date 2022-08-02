import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Commander } from '../../../../../Models/ArmyCreator';
import { Controller, useForm } from 'react-hook-form';
import { useArmyContext } from '../../../../../Contexts/ArmyListCreator/ArmyContext';
import InputField from '../../../../../Components/Atoms/InputField';
import Text from '../../../../../Components/Atoms/Text';
import Container from '../../../../../Components/Atoms/Container';
import { Picker } from '@react-native-picker/picker';
import Button from '../../../../../Components/Atoms/Button';
import { useTheme, useNavigation } from '@react-navigation/native';
import { StackActions, CommonActions } from '@react-navigation/native';


const EditCommander = () => {
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isDirty, isValid },
	} = useForm({
		defaultValues: {
			CommanderId: '',
			CommanderSurname: '',
			CommanderStaffRating: 7,
		},
	});
	const { currentCommander, setCurrentCommander } = useArmyContext();

	const nav = useNavigation();
	const renderSRDropdown = () => {
		let render = [];
		for (let i = 4; i < 10; i++) {
			render.push(<Picker.Item label={`${i}`} value={i} />);
		}
		return render;
	};
	const onSubmit = (data) => {
		console.log(data);
		const commander = new Commander();
		commander.CommanderFirstName = data.CommanderFirstName;
		commander.CommanderStaffRating = data.CommanderStaffRating;
		setCurrentCommander(data);
				// nav.dispatch(
				// 	StackActions.replace('EditBrigade', {
				// 		DivisionId: getValues('DivisionId'),
				// 	})
				// );
				nav.goBack();
				};


	const onError = () => {};
	return (
		<Container>
			<Controller
				control={control}
				name='CommanderFirstName'
				render={({ field: { onChange, value } }) => (
					<>
						{/* <Text>Name</Text> */}
						<InputField labelName='Name' value={value} onChangeText={(val) => onChange(val)} />
					</>
				)}
			/>

			<Text>Staff Rating</Text>
			<Controller
				control={control}
				name='CommanderStaffRating'
				render={({ field: { onChange, value } }) => (
					<Picker itemStyle={{ color: 'white' }} style={{ color: 'white' }} selectedValue={value} onValueChange={(v) => onChange(v)}>
						{renderSRDropdown()}
					</Picker> 
				)}
			/>
			{/* TODO - add multiselect for traits */}
			<Button type='primary' onPress={handleSubmit(onSubmit, onError)}>
				Add Commander
			</Button>
		</Container>
	);
};

export default EditCommander;

const styles = StyleSheet.create({});
