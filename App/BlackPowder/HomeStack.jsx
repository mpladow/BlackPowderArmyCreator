import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import Summary from "./Summary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const nav = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Pressable onPress={() => nav.navigate("Settings")}>
            <Text>ML</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="Summary" component={Summary} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
