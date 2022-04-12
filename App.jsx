import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme  } from "react-native";
import Router from "./Navigation/Router";
import ThemeProvider, { useThemeContext } from "./Contexts/ThemeContext";
import ArmyProvider from "./Contexts/ArmyContext";
import React, { useState } from "react";
import { NavigationContainer,    DefaultTheme,
  DarkTheme, } from "@react-navigation/native";
import { colors } from "./Constants/Styling";
import { useFonts } from "expo-font";
import { 
  NotoSans_400Regular,
  NotoSans_400Regular_Italic,
  NotoSans_700Bold,
  NotoSans_700Bold_Italic 
} from '@expo-google-fonts/noto-sans'
import { 
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from '@expo-google-fonts/poppins'
import AppLoading from "expo-app-loading";


export default function App() {
let [fontsLoaded] = useFonts({
  Poppins_400Regular,  NotoSans_400Regular,NotoSans_700Bold
})
if (!fontsLoaded) {
  return <AppLoading />;
}

  return (
      <ThemeProvider>
        <Router />
        </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
