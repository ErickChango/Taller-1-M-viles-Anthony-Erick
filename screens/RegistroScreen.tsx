import React, { useState } from 'react';
import { 
  ActivityIndicator, Alert, KeyboardAvoidingView, Platform, 
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, 
  View, Image, StatusBar 
} from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';

export default function RegistroScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (source: 'camera' | 'gallery') => {
    const { granted } = source === 'camera' 
      ? await ImagePicker.requestCameraPermissionsAsync() 
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert("Permisos Denegados", "Necesitamos acceso para procesar tu identidad visual.");
      return;
    }

    const result = source === 'camera' 
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 })
      : await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password || !imageUri) {
      Alert.alert("Faltan Datos", "Todo cazador necesita un nombre, correo, clave y un avatar de combate.");
      return;
    }
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: { data: { username } }
      });

      if (authError) throw authError;
      const userId = authData.user?.id;

      const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
      const filePath = `usuarios/${userId}.jpg`; 

      const { error: uploadError } = await supabase.storage
        .from('jugadores')
        .upload(filePath, decode(base64), { 
          contentType: 'image/jpeg',
          upsert: true 
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('jugadores').getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from('usuarios').upsert({
        id: userId,
        username: username,
        avatar_url: publicUrl,
        age: 18, 
        country: 'Ecuador'
      });

      if (dbError) throw dbError;

      Alert.alert("¡Registro Exitoso!", "Tu perfil ha sido encriptado y guardado.");
      navigation.navigate('Login');

    } catch (e: any) {
      Alert.alert("Error de Registro", e.message || "No se pudo crear el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.glowTop} />
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>NUEVO</Text>
          <Text style={[styles.title, { marginTop: -15, color: '#ff00ff', textShadowColor: '#ff00ff' }]}>RECLUTA</Text>
          <Text style={styles.subtitle}>ESTABLECE TU IDENTIDAD GENÉTICA</Text>
          
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarBorder}>
                <Image 
                  source={{ uri: imageUri || 'https://via.placeholder.com/150' }} 
                  style={styles.avatar} 
                />
              </View>
              <View style={styles.btnRow}>
                <TouchableOpacity onPress={() => pickImage('camera')} style={[styles.miniBtn, {borderColor: '#00fbff'}]}>
                  <Ionicons name="camera" size={20} color="#00fbff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickImage('gallery')} style={[styles.miniBtn, {borderColor: '#ff00ff'}]}>
                  <Ionicons name="images" size={20} color="#ff00ff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>NICKNAME DE COMBATE</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej: BugSlayer_X" 
              placeholderTextColor="#333" 
              onChangeText={setUsername} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
            <TextInput 
              style={styles.input} 
              placeholder="agente@hunter.com" 
              placeholderTextColor="#333" 
              onChangeText={setEmail} 
              keyboardType="email-address" 
              autoCapitalize="none" 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CÓDIGO DE SEGURIDAD</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••••••" 
              placeholderTextColor="#333" 
              secureTextEntry 
              onChangeText={setPassword} 
            />
          </View>

          <TouchableOpacity 
            style={styles.btnPrimary} 
            onPress={handleRegister} 
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>REGISTRAR EN EL SQUAD</Text>}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{marginTop: 25}}>
            <Text style={styles.loginLink}>
              ¿Ya eres del Squad? <Text style={styles.loginLinkHighlight}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <View style={styles.glowBottom} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050507' },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  glowTop: { position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(0, 251, 255, 0.05)' },
  glowBottom: { position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(255, 0, 255, 0.05)' },
  card: {
    width: '88%', maxWidth: 400, padding: 30, backgroundColor: '#0d0d10',
    borderRadius: 30, borderWidth: 1, borderColor: '#1a1a1e', alignItems: 'center',
  },
  title: { fontSize: 42, color: '#00fbff', fontWeight: '900', letterSpacing: 4, textShadowColor: '#00fbff', textShadowRadius: 15 },
  subtitle: { color: '#444', fontSize: 9, marginBottom: 30, letterSpacing: 2, fontWeight: 'bold' },
  avatarSection: { marginBottom: 35 },
  avatarWrapper: { position: 'relative', alignItems: 'center' },
  avatarBorder: {
    width: 130, height: 130, borderRadius: 65, borderWidth: 2, borderColor: '#1a1a1e',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#050507',
    shadowColor: '#00fbff', shadowOpacity: 0.2, shadowRadius: 10,
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  btnRow: { flexDirection: 'row', position: 'absolute', bottom: -10, gap: 15 },
  miniBtn: { 
    backgroundColor: '#0d0d10', padding: 12, borderRadius: 20, 
    borderWidth: 1, elevation: 5 
  },
  inputGroup: { width: '100%', marginBottom: 15 },
  label: { color: '#00fbff', fontSize: 9, fontWeight: 'bold', marginBottom: 6, letterSpacing: 1 },
  input: {
    width: '100%', padding: 15, backgroundColor: '#050507', color: '#fff',
    borderRadius: 12, borderWidth: 1, borderColor: '#1a1a1e', fontSize: 14,
  },
  btnPrimary: {
    backgroundColor: '#00fbff', width: '100%', padding: 18, borderRadius: 12,
    alignItems: 'center', marginTop: 15, shadowColor: '#00fbff',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  btnText: { color: '#000', fontWeight: '900', letterSpacing: 1, fontSize: 14 },
  loginLink: { color: '#444', fontSize: 12 },
  loginLinkHighlight: { color: '#ff00ff', fontWeight: 'bold' },
});