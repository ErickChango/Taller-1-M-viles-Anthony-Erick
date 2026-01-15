import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ route, navigation }: any) {
  const { username } = route.params;
  return (
    <View>
      <Text>¡Bienvenido, {username}!</Text>
      <TouchableOpacity onPress={() => navigation.replace('Main', { username })}>
        <Text>EMPEZAR PARTIDA</Text>
      </TouchableOpacity>
    </View>
  );
}