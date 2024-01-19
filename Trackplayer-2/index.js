import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import PlayerHome from './PlayerHome';
const Stack = createNativeStackNavigator();

const _StackNavigation = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator 
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PlayerHome" component={PlayerHome} />

    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default _StackNavigation

const styles = StyleSheet.create({})