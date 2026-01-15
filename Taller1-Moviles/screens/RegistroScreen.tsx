import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function RegistroScreen() {
  return (
    <View>
      <Text>Pagina para Registrarce</Text>
      <TextInput placeholder="Tu Usuariio" />
      <TouchableOpacity>
        <Text>GUARDAR</Text>
      </TouchableOpacity>
    </View>
  );
}