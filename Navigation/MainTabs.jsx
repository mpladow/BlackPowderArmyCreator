import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import HomeStack from "../App/BlackPowder/HomeStack";
import ScoringStack from "../App/Scoring/ScoringStack";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import Reference from "../App/Reference/Reference";
import { useThemeContext } from "../Contexts/ThemeContext";

const MainTabs = () => {
  const Tab = createBottomTabNavigator();
  const theme = useThemeContext();

  return (
    <Tab.Navigator screenOptions={{
      tabBarInactiveTintColor: theme.isDarkTheme? theme.DarkThemeCustom.Text : theme.DarkThemeCustom.Text,
      tabBarAccessibilityLabel: theme.isDarkTheme? theme.DarkThemeCustom.primary : theme.DarkThemeCustom.primary,
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
        ({color, size}) => (<MaterialCommunityIcons name="scoreboard-outline" size={24} color={color} />)}} 
        name="Tracker" 
        component={ScoringStack} />
              <Tab.Screen options={{
                headerShown: true,
        tabBarIcon:
        ({color, size}) => (<Entypo name="text-document" size={24} color={color} />)}} 
        name="Reference" 
        component={Reference} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({});
