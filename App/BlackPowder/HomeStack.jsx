import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import Summary from "./Summary";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import Text from '../Components/Atoms/Text';
import ProfileButton from "../Profile/ProfileButton";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();
  const nav = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleStyle: {fontFamily: 'NotoSans_700Bold', fontSize: 24},
        headerRight: () => (
          <ProfileButton onPress={() => nav.navigate("Settings")}/>
        ),
      }}
    >
      <Stack.Screen name="Summary" options={{headerTitle: 'BP Companion'}}component={Summary} />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
