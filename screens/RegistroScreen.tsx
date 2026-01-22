import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig'; 

export default function RegistroScreen({ navigation }: any) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false);

  const registrarJugador = async () => {
    if (!user || !email || !password) {
      return Alert.alert("Error", "Todos los campos son obligatorios");
    }

    setLoading(true);

    // 1. Registro en Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        data: { username: user } 
      }
    });

    if (authError) {
      Alert.alert("Error de Autenticación", authError.message);
      setLoading(false);
      return;
    }

    // 2. Inserción en la tabla 'usuarios' (la que sale en tu captura)
    if (data.user) {
      const { error: dbError } = await supabase
        .from('usuarios')
        .insert([
          { 
            id: data.user.id, 
            username: user 
          }
        ]);

      setLoading(false);

      if (dbError) {
        console.error("Error DB:", dbError.message);
        Alert.alert("Aviso", "Cuenta creada, pero hubo un problema al guardar tu perfil.");
      } else {
        Alert.alert("ÉXITO", "Jugador registrado. Por favor, verifica tu correo si es necesario.");
        navigation.navigate('Login');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NUEVO REGISTRO</Text>
      <TextInput style={styles.input} placeholder="Username (Alias)" placeholderTextColor="#555" value={user} onChangeText={setUser} />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#555" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#555" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={[styles.btn, loading && { opacity: 0.7 }]} onPress={registrarJugador} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>GUARDAR DATOS</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
        <Text style={{ color: '#00fbff' }}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, color: '#00fbff', marginBottom: 30, fontWeight: 'bold', letterSpacing: 2 },
  input: { width: '85%', padding: 15, backgroundColor: '#111', color: '#fff', borderRadius: 5, borderBottomWidth: 2, borderBottomColor: '#00fbff', marginBottom: 15 },
  btn: { backgroundColor: '#00fbff', padding: 15, width: '85%', marginTop: 20, borderRadius: 5 },
  btnText: { color: '#000', textAlign: 'center', fontWeight: 'bold' }
});