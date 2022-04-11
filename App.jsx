import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme  } from "react-native";
import Router from "./Navigation/Router";
import ThemeProvider, { useThemeContext } from "./Contexts/ThemeContext";
import ArmyProvider from "./Contexts/ArmyContext";
import React, { useState } from "react";
import { NavigationContainer,    DefaultTheme,
  DarkTheme, } from "@react-navigation/native";
import { Colors } from "./Constants/Styling";

export default function App() {
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
