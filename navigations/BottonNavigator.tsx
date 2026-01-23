import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import JuegoScreen from '../screens/JuegoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';

const Tab = createBottomTabNavigator();

export default function BottonNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#00fbff', height: 60 },
        tabBarActiveTintColor: '#00fbff',
        tabBarInactiveTintColor: '#555',
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'Juego') iconName = 'game-controller';
          else if (route.name === 'Perfil') iconName = 'person';
          else if (route.name === 'Ranking') iconName = 'trophy';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Juego" component={JuegoScreen} />
      <Tab.Screen name="Ranking" component={PuntuacionScreen} />
    </Tab.Navigator>
  );
}