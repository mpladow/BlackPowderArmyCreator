import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import HomeStack from "../App/BlackPowder/HomeStack";
import ScoringStack from "../App/Scoring/ScoringStack";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import Reference from "../App/Reference/Reference";

const MainTabs = () => {
  const Tab = createBottomTabNavigator();

  const nav = useNavigation()
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, headerShadowVisible: false}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={size} color={color} />
          ),
        }}
        name="Home"
        component={HomeStack} />
      <Tab.Screen options={{
        tabBarIcon:
        ({color, size}) => (<MaterialCommunityIcons name="scoreboard-outline" size={24} color="black" />)}} 
        name="Scoring" 
        component={ScoringStack} />
              <Tab.Screen options={{
                headerShown: true,
        tabBarIcon:
        ({color, size}) => (<Entypo name="text-document" size={24} color="black" />)}} 
        name="Reference" 
        component={Reference} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
