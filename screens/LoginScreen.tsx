import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre de Usuario" 
        placeholderTextColor="#555"
        onChangeText={setUsername} 
      />
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Welcome', { username })}>
        <Text style={styles.btnText}>INICIAR SESION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, color: '#00fbff', fontWeight: 'bold', marginBottom: 40, letterSpacing: 3 },
  input: { width: '85%', padding: 15, backgroundColor: '#111', color: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#00fbff' },
  btn: { backgroundColor: '#00fbff', padding: 15, borderRadius: 5, width: '85%', marginTop: 20 },
  btnText: { color: '#000', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});