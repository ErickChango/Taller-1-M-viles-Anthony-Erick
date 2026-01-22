import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig'; 

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const iniciarSesion = async () => {
    // Validación básica de campos vacíos
    if (!email || !password) {
      return Alert.alert("Atención", "Por favor, ingresa tu correo y contraseña");
    }

    setLoading(true);
    
    // Intento de inicio de sesión con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    setLoading(false);

    if (error) {
  
      Alert.alert("Error de acceso", "El correo o la contraseña son incorrectos.");
    } else {
   
      const username = data.user?.user_metadata?.username || "Jugador";
      
      
      navigation.navigate('Welcome', { username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIAR SESIÓN</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        placeholderTextColor="#555" 
        autoCapitalize="none" 
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        placeholderTextColor="#555" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword} 
      />

      <TouchableOpacity 
        style={[styles.btn, loading && { opacity: 0.7 }]} 
        onPress={iniciarSesion} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.btnText}>ENTRAR</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate('Registro')} 
        style={styles.registerLink}
      >
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 32, 
    color: '#00fbff', 
    fontWeight: 'bold', 
    marginBottom: 40,
    letterSpacing: 1
  },
  input: { 
    width: '85%', 
    padding: 15, 
    backgroundColor: '#111', 
    color: '#fff', 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#00fbff', 
    marginBottom: 15 
  },
  btn: { 
    backgroundColor: '#00fbff', 
    padding: 15, 
    borderRadius: 5, 
    width: '85%',
    marginTop: 10
  },
  btnText: { 
    color: '#000', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  },
  registerLink: { 
    marginTop: 25 
  },
  linkText: { 
    color: '#00fbff', 
    textDecorationLine: 'underline' 
  }
});