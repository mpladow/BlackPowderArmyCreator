import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Modal, useColorScheme } from 'react-native';
import React from 'react';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import MainTabs from './MainTabs';
import DrawerPages from './DrawerPages';
import Settings from '../Profile/Settings';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ThemeProvider, { useThemeContext } from '../Contexts/ThemeContext';
import ArmyProvider from '../Contexts/ArmyContext';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../Themes/Styling';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ReferenceProvider from '../Contexts/ReferenceContext';
import ArmyCreatorHome from '../ArmyListCreator/ArmyCreatorHome';
import Prototype from '../Debug/Prototype';
import Reference from '../Reference/Reference';
import RulesProvider from '../Contexts/RulesContext';

const Router = () => {
	const RootStack = createNativeStackNavigator();
	const theme = useThemeContext();
	
	return (
		<RulesProvider>
			<ReferenceProvider>
				<ArmyProvider>
					{/* <SafeAreaView style={{ flex: 1 }}> */}
					<View
						style={[
							styles.container,
							theme.isDarkTheme
								? {
										backgroundColor:
											colors.black,
								  }
								: {
										backgroundColor:
											colors.offWhite1,
								  },
						]}
					>
						<NavigationContainer
							theme={
								theme.isDarkTheme
									? theme.DarkThemeCustom
									: theme.LightThemeCustom
							}
						>
							<RootStack.Navigator>
								{/* <DrawerPages/> */}

								<RootStack.Group
									screenOptions={{
										headerShown: false,
									}}
								>
									<RootStack.Screen
										name='MainTabs'
										component={
											MainTabs
										}
									/>
								</RootStack.Group>
								<RootStack.Group
									screenOptions={{
										presentation:
											'modal',
									}}
								>
									<RootStack.Screen
										name='Settings'
										component={
											Settings
										}
									/>
								</RootStack.Group>
							</RootStack.Navigator>
						</NavigationContainer>
						<StatusBar
							style={
								theme.isDarkTheme
									? 'light'
									: 'dark'
							}
							backgroundColor={
								theme.isDarkTheme
									? colors.black
									: colors.offWhite1
							}
						/>
						{/* </SafeAreaView> */}
					</View>
				</ArmyProvider>
			</ReferenceProvider>
		</RulesProvider>
	);
};
export default Router;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
