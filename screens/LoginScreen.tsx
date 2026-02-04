import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView, Platform,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert("Acceso Denegado", "Ingresa tus credenciales de cazador.");
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });
    setLoading(false);
    if (error) {
      Alert.alert("Fallo", "Usuario o clave incorrectos.");
    } else {
      navigation.navigate('Welcome', { 
        username: data.user?.user_metadata?.username || "Cazador", 
        userId: data.user?.id 
      });
    }
  };

  const handleAuth = async (type: 'face' | 'fingerprint') => {
    try {
      Keyboard.dismiss();
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !enrolled) {
        Alert.alert("Aviso", "Este método no está configurado en tu dispositivo.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: type === 'face' ? 'ESCANEANDO ROSTRO' : 'VALIDANDO HUELLA',
        biometricsSecurityLevel: 'weak', 
      });

      if (result.success) {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          navigation.navigate('Welcome', { 
            username: user.user_metadata?.username || "Cazador", 
            userId: user.id 
          });
        } else {
          Alert.alert("Error", "Primero inicia sesión con clave.");
        }
      }
    } catch (e) { console.log(e); } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.glowTop} />
      
      <View style={styles.card}>
        <Text style={styles.title}>BUG</Text>
        <Text style={[styles.title, { marginTop: -20, color: '#ff00ff', textShadowColor: '#ff00ff' }]}>HUNTER</Text>
        <Text style={styles.subtitle}>SQUAD DE EXTERMINIO NEÓN</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>CORREO</Text>
          <TextInput style={styles.input} placeholder="hunter@swat.com" placeholderTextColor="#333" onChangeText={setEmail} autoCapitalize="none" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CÓDIGO</Text>
          <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#333" secureTextEntry onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>ENTRAR AL CAMPO</Text>}
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.orText}>MÉTODOS BIOMÉTRICOS</Text>
        </View>

        <View style={styles.biometricRow}>
          <TouchableOpacity 
            style={styles.bioSquare} 
            onPress={() => handleAuth('face')}
          >
            <Ionicons name="scan" size={28} color="#00fbff" />
            <Text style={styles.bioLabel}>ROSTRO</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.bioSquare} 
            onPress={() => handleAuth('fingerprint')}
          >
            <Ionicons name="finger-print" size={28} color="#ff00ff" />
            <Text style={[styles.bioLabel, { color: '#ff00ff' }]}>HUELLA</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={{marginTop: 25}}>
          <Text style={styles.registerLink}>
            ¿Nuevo recluta? <Text style={styles.registerLinkHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.glowBottom} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050507', justifyContent: 'center', alignItems: 'center' },
  glowTop: { position: 'absolute', top: -50, left: -50, width: 250, height: 250, backgroundColor: 'rgba(0, 251, 255, 0.05)' },
  glowBottom: { position: 'absolute', bottom: -50, right: -50, width: 250, height: 250, backgroundColor: 'rgba(255, 0, 255, 0.05)' },
  card: { width: '88%', maxWidth: 400, padding: 30, backgroundColor: '#0d0d10', borderRadius: 30, borderWidth: 1, borderColor: '#1a1a1e', alignItems: 'center' },
  title: { fontSize: 45, color: '#00fbff', fontWeight: '900', letterSpacing: 4, textShadowColor: '#00fbff', textShadowRadius: 15 },
  subtitle: { color: '#444', fontSize: 10, marginBottom: 30, letterSpacing: 2, fontWeight: 'bold' },
  inputGroup: { width: '100%', marginBottom: 15 },
  label: { color: '#00fbff', fontSize: 9, fontWeight: 'bold', marginBottom: 5 },
  input: { width: '100%', padding: 14, backgroundColor: '#050507', color: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#1a1a1e' },
  btnPrimary: { backgroundColor: '#00fbff', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#000', fontWeight: '900' },
  divider: { marginVertical: 20 },
  orText: { color: '#333', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
  biometricRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', gap: 15 },
  bioSquare: { 
    flex: 1, height: 80, backgroundColor: '#0d0d10', borderRadius: 15, 
    borderWidth: 1, borderColor: '#1a1a1e', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#00fbff', shadowOpacity: 0.1, shadowRadius: 5
  },
  bioLabel: { color: '#00fbff', fontSize: 10, fontWeight: 'bold', marginTop: 8 },
  registerLink: { color: '#444', fontSize: 12 },
  registerLinkHighlight: { color: '#ff00ff', fontWeight: 'bold' }
});
