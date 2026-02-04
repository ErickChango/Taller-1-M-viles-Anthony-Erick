import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function PerfilScreen() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [pais, setPais] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setNombre(data.username || '');
          setEdad(data.age ? data.age.toString() : ''); 
          setPais(data.country || '');
          setImage(data.avatar_url ? `${data.avatar_url}?t=${Date.now()}` : null);
        }
      }
    } catch (error) {
      console.log("Error al cargar:", error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const guardarCambios = async () => {
    setUpdating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No hay sesión activa");

      let finalImageUrl = image;

      if (image && image.startsWith('file://')) {
        const { data: perfilActual } = await supabase
          .from('usuarios')
          .select('avatar_url')
          .eq('id', user.id)
          .single();

        if (perfilActual?.avatar_url) {
          const nombreArchivoViejo = perfilActual.avatar_url.split('/').pop()?.split('?')[0];
          if (nombreArchivoViejo) {
            await supabase.storage
              .from('jugadores')
              .remove([`galeria/${nombreArchivoViejo}`]);
            console.log("🗑️ Archivo antiguo eliminado del Storage");
          }
        }

        const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
        const fileName = `${user.id}_${Date.now()}.jpg`;
        const filePath = `galeria/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('jugadores')
          .upload(filePath, decode(base64), { 
            contentType: 'image/jpeg',
            upsert: true 
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('jugadores').getPublicUrl(filePath);
        finalImageUrl = urlData.publicUrl;
      }

      const urlLimpiaParaDB = finalImageUrl ? finalImageUrl.split('?')[0] : null;

      const { error: dbError } = await supabase
        .from('usuarios')
        .upsert({
          id: user.id,
          username: nombre,
          age: parseInt(edad) || 0,
          country: pais,
          avatar_url: urlLimpiaParaDB
        });

      if (dbError) throw dbError;

      Alert.alert("Éxito", "Perfil actualizado y archivos optimizados.");
      await cargarDatos();

    } catch (error: any) {
      Alert.alert("Error de guardado", error.message);
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#00fbff" />
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.glowTop} />
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>PERFIL</Text>
          <Text style={[styles.title, { marginTop: -15, color: '#ff00ff' }]}>CAZADOR</Text>

          <TouchableOpacity onPress={actualizarFoto} style={styles.avatarWrapper}>
            <View style={styles.avatarBorder}>
              <Image 
                key={image}
                source={{ uri: image || 'https://via.placeholder.com/150' }} 
                style={styles.avatar} 
              />
            </View>
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={18} color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.label}>NICKNAME</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

            <Text style={styles.label}>EDAD</Text>
            <TextInput style={styles.input} value={edad} onChangeText={setEdad} keyboardType="numeric" />

            <Text style={styles.label}>ZONA (PAÍS)</Text>
            <TextInput style={styles.input} value={pais} onChangeText={setPais} />

            <TouchableOpacity style={styles.btn} onPress={guardarCambios} disabled={updating}>
              {updating ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>SINCRONIZAR DATOS</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#050507' },
  loadingContainer: { flex: 1, backgroundColor: '#050507', justifyContent: 'center', alignItems: 'center' },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  glowTop: { position: 'absolute', top: -100, left: -100, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(0, 251, 255, 0.05)' },
  card: { width: '88%', maxWidth: 400, padding: 30, backgroundColor: '#0d0d10', borderRadius: 30, borderWidth: 1, borderColor: '#1a1a1e', alignItems: 'center' },
  title: { fontSize: 42, color: '#00fbff', fontWeight: '900', letterSpacing: 4 },
  avatarWrapper: { marginVertical: 20, position: 'relative' },
  avatarBorder: { width: 140, height: 140, borderRadius: 70, borderWidth: 2, borderColor: '#00fbff', justifyContent: 'center', alignItems: 'center', backgroundColor: '#050507' },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#00fbff', padding: 10, borderRadius: 25, borderWidth: 3, borderColor: '#0d0d10' },
  form: { width: '100%' },
  label: { color: '#00fbff', fontSize: 10, fontWeight: 'bold', marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: '#050507', padding: 15, borderRadius: 12, color: '#fff', borderWidth: 1, borderColor: '#1a1a1e' },
  btn: { backgroundColor: '#00fbff', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  btnText: { color: '#000', fontWeight: '900', letterSpacing: 1 }
});
