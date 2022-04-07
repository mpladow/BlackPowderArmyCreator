import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Router from "./Navigation/Router";
import ThemeProvider from "./Contexts/ThemeContext";
import ArmyProvider from "./Contexts/ArmyContext";
import React from "react";
export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      
        <Router />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
