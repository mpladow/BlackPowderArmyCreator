import 'react-native-gesture-handler';
import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import ArmyCreatorHome from './ListCreatorHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../Components/Atoms/Text';
import ProfileButton from '../../../Profile/ProfileButton';
import EditArmy from './ListCreator/EditArmy/EditArmy';
import ArmyDetails from './ListCreator/ArmyDetails';
import EditDivision from './ListCreator/EditDivision/EditDivision';

const HomeStack = () => {
	const Stack = createNativeStackNavigator();
	const nav = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerShadowVisible: false,
				headerTitleStyle: {
					fontFamily: 'NotoSans_700Bold',
					fontSize: 18,
				},
				headerRight: () => (
					<ProfileButton
						onPress={() =>
							nav.navigate('Settings')
						}
					/>
				),
			}}
		>
			<Stack.Screen
				name='Summary'
				options={{ headerTitle: 'BP Companion' }}
				component={ArmyCreatorHome}
			/>
			<Stack.Screen
				name='EditArmy'
				options={{
					headerTitle: 'Create Army',
					presentation: 'modal',
				}}
				component={EditArmy}
			/>
			<Stack.Screen
				name='EditDivision'
				options={{
					headerTitle: 'Edit Division',
					presentation: 'modal',
				}}
				component={EditDivision}
			/>
			<Stack.Screen
				name='ArmyDetails'
				options={{
					headerTitle: 'Army Details',
					// headerRight: () => (
					// 	<Pressable>
					// 		<Text>Edit</Text>
					// 	</Pressable>
					// ),
				}}
				component={ArmyDetails}
			/>
		</Stack.Navigator>
	);
};

export default HomeStack;

const styles = StyleSheet.create({});
