import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Settings from '../Profile/Settings';
import MainTabs from './MainTabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


const DrawerPages = () => {
    const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName="MainTabs">
        <Drawer.Screen name="Settings" component={Settings} />
        {/* <Drawer.Screen name="MainTabs" component={MainTabs} /> */}
      </Drawer.Navigator>
  )
}

export default DrawerPages

const styles = StyleSheet.create({})