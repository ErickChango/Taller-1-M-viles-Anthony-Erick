import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import RegistroScreen from '../screens/RegistroScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}