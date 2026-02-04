import 'react-native-gesture-handler'; // Importante para el Stack y Drawer Navigator
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigations/MainNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}