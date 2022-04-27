import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalCustom from '../../../Components/Atoms/ModalCustom'
import InputField from '../../../Components/Atoms/InputField';
import { Controller, useForm } from 'react-hook-form';

const EditDivision = () => {
	  const {
			control,
			handleSubmit,
			formState: { errors },
		} = useForm({
			defaultValues: {
				DivisionId: 0,
				DivisionName: '',
				Commander: {},
			},
		});
  return (
		<ModalCustom>
			<Text>EditDivision</Text>
			<Controller
				render={({field}) => (
					<InputField labelName='Division Name' value={field.value}/>
				)}
				name={'DivisionName'}
			/>
			<InputField labelName='Commander Name' />
		</ModalCustom>
  );
}

export default EditDivision

const styles = StyleSheet.create({})