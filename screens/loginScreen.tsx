import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig'; 

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async () => {
    if (!email || !password) return Alert.alert("Atención", "Ingresa tus credenciales");

    setLoading(true);
    

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    } else {
  
      const username = data.user?.user_metadata?.username || "Jugador";
      navigation.navigate('Welcome', { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Juegos Login</Text>
      
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

      <TouchableOpacity style={styles.btn} onPress={iniciarSesion} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.btnText}>INICIAR SESION</Text>
        )}
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