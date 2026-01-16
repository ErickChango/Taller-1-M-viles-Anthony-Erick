import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MyDrawer({ route }: any) {
  const { username } = route.params || { username: 'Usuario' };

  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#e74c3c' }, 
        headerTintColor: '#fff',
        drawerActiveTintColor: '#e74c3c'
      }}
    >
      <Drawer.Screen 
        name="Juego" 
        component={JuegoScreen} 
        initialParams={{ username }} 
        options={{ title: '🦟 Cazar Mosquitos' }} 
      />
      <Drawer.Screen 
        name="Ranking" 
        component={PuntuacionScreen} 
        options={{ title: '🏆 Top Global' }} 
      />
      <Drawer.Screen 
        name="Perfil" 
        component={PerfilScreen} 
        initialParams={{ username }} 
        options={{ title: '👤 Mi Perfil' }} 
      />
    </Drawer.Navigator>
  );
}


export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      <Stack.Screen name="Main" component={MyDrawer} />
    </Stack.Navigator>
  );
}