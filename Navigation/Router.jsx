import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import DrawerPages from "./DrawerPages";
import Settings from "../App/Profile/Settings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ThemeProvider from "../Contexts/ThemeContext";
import ArmyProvider from "../Contexts/ArmyContext";

const Router = () => {
  const RootStack = createNativeStackNavigator();
  return (
    <ArmyProvider>
    <NavigationContainer>
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
      </ArmyProvider>
  );
};
export default Router;

const styles = StyleSheet.create({});
