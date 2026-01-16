import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function RegistroScreen({ navigation }: any) {
  const [user, setUser] = useState('');

  const registrarJugador = async () => {
    if(!user) return Alert.alert("Error", "El alias es obligatorio");
    const { error } = await supabase.from('usuarios').insert([{ username: user }]);
    if (!error) {
      Alert.alert("EXITO", "Jugador registrado en la base de datos");
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUEVO REGISTRO</Text>
      <TextInput style={styles.input} placeholder="Alias" placeholderTextColor="#555" onChangeText={setUser} />
      <TouchableOpacity style={styles.btn} onPress={registrarJugador}>
        <Text style={styles.btnText}>GUARDAR DATOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: '#00fbff', marginBottom: 30 },
  input: { width: '85%', padding: 15, backgroundColor: '#111', color: '#fff', borderRadius: 5, borderBottomWidth: 2, borderBottomColor: '#00fbff' },
  btn: { backgroundColor: '#00fbff', padding: 15, width: '85%', marginTop: 30 },
  btnText: { color: '#000', textAlign: 'center', fontWeight: 'bold' }
});