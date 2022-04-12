import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Summary from "./Summary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScoringStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontFamily: "NotoSans_700Bold", fontSize: 24 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          options={{ headerTitle: "Game Trackers" }}
          name="Tracker"
          component={Summary}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ScoringStack;

const styles = StyleSheet.create({});
