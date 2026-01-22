import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function RegistroScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);

  const registrarJugador = async () => {
    if (!user || !email || !password) return Alert.alert("Error", "Todos los campos son obligatorios");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username: user } 
      }
    });

    if (authError) {
      Alert.alert("Error", authError.message);
      setLoading(false);
      return;
    }


    const { error: dbError } = await supabase
      .from('usuarios')
      .insert([{ username: user }]);

    setLoading(false);

    if (dbError) {
      Alert.alert("Error", "Usuario creado, pero no se pudo guardar el alias.");
    } else {
      Alert.alert("ÉXITO", "Jugador registrado correctamente. Verifica tu email.");
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUEVO REGISTRO</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor="#555" 
        onChangeText={setUser} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
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

      <TouchableOpacity style={styles.btn} onPress={registrarJugador} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>GUARDAR DATOS</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: '#00fbff', marginBottom: 30, fontWeight: 'bold' },
  input: { width: '85%', padding: 15, backgroundColor: '#111', color: '#fff', borderRadius: 5, borderBottomWidth: 2, borderBottomColor: '#00fbff', marginBottom: 15 },
  btn: { backgroundColor: '#00fbff', padding: 15, width: '85%', marginTop: 20, borderRadius: 5 },
  btnText: { color: '#000', textAlign: 'center', fontWeight: 'bold' }
});