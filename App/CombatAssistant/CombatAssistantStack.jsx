import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ProfileButton from '../Profile/ProfileButton';
import Home from './Home';


const CombatAssistantStack = () => {
	const Stack = createNativeStackNavigator();
	const nav = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				headerShadowVisible: false,
				headerTitleStyle: {
					fontFamily: 'NotoSans_700Bold',
					fontSize: 24,
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
				name='CombatAssistantHome'
				options={{ headerTitle: 'Combat Assistant' }}
				component={Home}
			/>
		</Stack.Navigator>
	);
};

export default CombatAssistantStack

const styles = StyleSheet.create({})