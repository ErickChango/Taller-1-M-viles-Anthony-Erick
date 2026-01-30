import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
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
        Alert.alert("¡ÉXITO!", "Tu cuenta ha sido creada. ¡Bienvenido al equipo!");
        navigation.navigate('Login');
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Decoración Superior */}
        <View style={styles.headerDecoration} />

        <View style={styles.formCard}>
          <Text style={styles.title}>CREAR CUENTA</Text>
          <Text style={styles.subtitle}>Únete a la aventura</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>NICKNAME</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej: ProPlayer99" 
              placeholderTextColor="#444" 
              value={user} 
              onChangeText={setUser} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <TextInput 
              style={styles.input} 
              placeholder="tu@correo.com" 
              placeholderTextColor="#444" 
              autoCapitalize="none" 
              keyboardType="email-address" 
              value={email} 
              onChangeText={setEmail} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CONTRASEÑA</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Mínimo 6 caracteres" 
              placeholderTextColor="#444" 
              secureTextEntry 
              value={password} 
              onChangeText={setPassword} 
            />
          </View>

          <TouchableOpacity 
            style={[styles.btn, loading && { opacity: 0.7 }]} 
            onPress={registrarJugador} 
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.btnText}>REGISTRARME</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')} 
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              ¿Ya eres miembro? <Text style={styles.linkHighlight}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0c' 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerDecoration: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#00fbff10',
  },
  formCard: {
    width: '85%',
    alignItems: 'center',
  },
  title: { 
    fontSize: 32, 
    color: '#00fbff', 
    fontWeight: '900', 
    letterSpacing: 2,
    textShadowColor: '#00fbff50',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 5
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 40,
    letterSpacing: 1,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#00fbff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 1.5,
  },
  input: { 
    width: '100%', 
    padding: 16, 
    backgroundColor: '#16161a', 
    color: '#fff', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#333',
    fontSize: 15,
  },
  btn: { 
    backgroundColor: '#00fbff', 
    padding: 18, 
    width: '100%', 
    marginTop: 20, 
    borderRadius: 12,
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
    letterSpacing: 1,
    fontSize: 16
  },
  loginLink: { 
    marginTop: 30 
  },
  loginText: { 
    color: '#666', 
    fontSize: 14 
  },
  linkHighlight: { 
    color: '#00fbff', 
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});