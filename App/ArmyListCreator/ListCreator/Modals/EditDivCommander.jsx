import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputField from '../../../Components/Atoms/InputField';
import { useForm } from 'react-hook-form';

const EditDivCommander = () => {
	useForm()
  return (
		<View>
			<InputField labelName='Commander Name' />
			<InputField labelName='Commander Name' />
		</View>
  );
}

export default EditDivCommander

const styles = StyleSheet.create({})