import 'react-native-gesture-handler';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import Router from './App/Navigation/Router';
import ThemeProvider, { useThemeContext } from './App/Contexts/ThemeContext';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import {
	NotoSans_400Regular,
	NotoSans_400Regular_Italic,
	NotoSans_700Bold,
	NotoSans_700Bold_Italic,
} from '@expo-google-fonts/noto-sans';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';

export default function App() {
	let [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_600SemiBold,
		NotoSans_400Regular,
		NotoSans_700Bold,
		NotoSans_400Regular_Italic,
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider>
				<Router />
		</ThemeProvider>
	);
}
