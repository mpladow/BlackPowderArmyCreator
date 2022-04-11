import { StyleSheet, Text, View, Modal, useColorScheme } from "react-native";
import React from "react";
import { NavigationContainer,    DefaultTheme,
  DarkTheme, } from "@react-navigation/native";
  import MainTabs from "./MainTabs";
import DrawerPages from "./DrawerPages";
import Settings from "../App/Profile/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeProvider, { useThemeContext } from "../Contexts/ThemeContext";
import ArmyProvider from "../Contexts/ArmyContext";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../Constants/Styling";

const Router = () => {
  const RootStack = createNativeStackNavigator();
  const theme = useThemeContext();

  return (
    <ArmyProvider>
    <View style={[styles.container, theme.isDarkTheme? {backgroundColor: Colors.black} : {backgroundColor: Colors.offWhite1}]}>
            <NavigationContainer  theme={theme.isDarkTheme ? theme.DarkThemeCustom : theme.LightThemeCustom}>
        <RootStack.Navigator>
          {/* <DrawerPages/> */}
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="MainTabs" component={MainTabs} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="Settings" component={Settings} />
          </RootStack.Group>
        </RootStack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />

        </View>

      </ArmyProvider>
  );
};
export default Router;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});