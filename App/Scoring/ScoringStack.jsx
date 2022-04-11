import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Summary from './Summary'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ScoringStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen name='Tracker' component={Summary}/>
        </Stack.Group>
    </Stack.Navigator>
  )
}

export default ScoringStack

const styles = StyleSheet.create({})