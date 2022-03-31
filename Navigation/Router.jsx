import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';
import HomeStack from '../App/Home/HomeStack';


const Router = () => {
    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})