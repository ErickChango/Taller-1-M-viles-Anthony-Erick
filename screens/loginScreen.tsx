import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarLoginProvisional = () => {

    navigation.navigate('Welcome', { username: 'Jugador Prueba' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos Login</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo Electrónico" 
        placeholderTextColor="#555"
        autoCapitalize="none"
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        placeholderTextColor="#555"
        secureTextEntry
        onChangeText={setPassword} 
      />

      <TouchableOpacity style={styles.btn} onPress={manejarLoginProvisional}>
        <Text style={styles.btnText}>INICIAR SESION</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#00fbff', textDecorationLine: 'underline' }}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, color: '#00fbff', fontWeight: 'bold', marginBottom: 40, letterSpacing: 3 },
  input: { width: '85%', padding: 15, backgroundColor: '#111', color: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#00fbff', marginBottom: 15 },
  btn: { backgroundColor: '#00fbff', padding: 15, borderRadius: 5, width: '85%', marginTop: 10 },
  btnText: { color: '#000', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});