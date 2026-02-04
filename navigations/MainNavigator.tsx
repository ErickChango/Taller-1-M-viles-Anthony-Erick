import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

// Importa tus pantallas
import LoginScreen from '../screens/LoginScreen';
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function AppTabs({ route }: any) {

  const { username, userId } = route.params || {}; 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarStyle: {
          backgroundColor: '#0a0a0c',
          borderTopColor: '#00fbff',
          borderTopWidth: 1,
          height: 65, 
          paddingBottom: 10, 
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#00fbff', 
        tabBarInactiveTintColor: '#555', 
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Juego') iconName = 'game-controller-outline';
          else if (route.name === 'Ranking') iconName = 'trophy-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Juego" 
        component={JuegoScreen} 
        initialParams={{ username, userId }} 
      />
      <Tab.Screen 
        name="Ranking" 
        component={PuntuacionScreen} 
        
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        initialParams={{ username, userId }} 
      />
    </Tab.Navigator>
  );
}


export default function MainNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false, 
        cardStyle: { backgroundColor: '#0a0a0c' } 
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
   
      <Stack.Screen name="App" component={AppTabs} /> 
    </Stack.Navigator>
  );
}