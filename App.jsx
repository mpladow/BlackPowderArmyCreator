import { StyleSheet, Text, View, useColorScheme  } from "react-native";
import Router from "./Navigation/Router";
import ThemeProvider, { useThemeContext } from "./Contexts/ThemeContext";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { 
  NotoSans_400Regular,
  NotoSans_400Regular_Italic,
  NotoSans_700Bold,
  NotoSans_700Bold_Italic 
} from '@expo-google-fonts/noto-sans'
import { 
  Poppins_400Regular,
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
        {/* <Text>BLASH</Text> */}
        <Router />
        </ThemeProvider>
  );
}

