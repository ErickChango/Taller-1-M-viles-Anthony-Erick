import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Decoración de fondo (Glow) */}
      <View style={styles.circleDecorator} />
      
      <View style={styles.card}>
        <Text style={styles.title}>BIENVENIDO</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput 
            style={styles.input} 
            placeholder="tu@email.com" 
            placeholderTextColor="#444"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={setEmail} 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CONTRASEÑA</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            placeholderTextColor="#444"
            secureTextEntry
            onChangeText={setPassword} 
          />
        </View>

        <TouchableOpacity 
          style={[styles.btn, loading && { opacity: 0.7 }]} 
          onPress={iniciarSesion} 
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.btnText}>ENTRAR AL JUEGO</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Registro')} 
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            ¿Nuevo aquí? <Text style={styles.linkHighlight}>Crea una cuenta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0c', // Negro azulado profundo
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  circleDecorator: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#00fbff15', // Glow sutil
  },
  card: {
    width: '85%',
    padding: 20,
    alignItems: 'center',
  },
  title: { 
    fontSize: 40, 
    color: '#00fbff', 
    fontWeight: '900', 
    marginBottom: 5, 
    letterSpacing: 4,
    textShadowColor: '#00fbff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 40,
    letterSpacing: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#00fbff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 5,
    letterSpacing: 1,
  },
  input: { 
    width: '100%', 
    padding: 16, 
    backgroundColor: '#16161a', 
    color: '#fff', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#333',
    fontSize: 16,
  },
  btn: { 
    backgroundColor: '#00fbff', 
    padding: 18, 
    borderRadius: 12, 
    width: '100%', 
    marginTop: 10,
    shadowColor: '#00fbff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  btnText: { 
    color: '#000', 
    textAlign: 'center', 
    fontWeight: '900', 
    fontSize: 16,
    letterSpacing: 1,
  },
  registerLink: { 
    marginTop: 25 
  },
  registerText: { 
    color: '#666', 
    fontSize: 14 
  },
  linkHighlight: { 
    color: '#00fbff', 
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});