import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Summary from './Summary'
import { createNativeStackNavigator, NativeStackView } from '@react-navigation/native-stack';

const HomeStack = () => {
    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Summary' component={Summary} />
        </HomeStack.Navigator>
    )
}

export default HomeStack

const styles = StyleSheet.create({})