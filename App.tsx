import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainNav from './navigations/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainNav  /> 
    </NavigationContainer>
  );
}