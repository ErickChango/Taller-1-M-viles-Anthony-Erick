import { Alert, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/superbase/SuperbaseConfig';

export default function PerfilScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara.');

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const subirImagenYActualizar = async () => {
    if (!image || !userId) {
      Alert.alert("Error", "Selecciona una imagen primero.");
      return;
    }

    setUploading(true);
    try {
      // 1. FormData: Soluciona el "Network request failed" en Android
      const formData = new FormData();
      const fileName = `${userId}.jpg`;
      
      // @ts-ignore
      formData.append('file', {
        uri: Platform.OS === 'ios' ? image.replace('file://', '') : image,
        name: fileName,
        type: 'image/jpeg',
      });

      // 2. Subida al bucket 'usuarios' (visto en tu consola)
      const { error: uploadError } = await supabase.storage
        .from('usuarios') 
        .upload(`perfiles/${fileName}`, formData as any, { 
          contentType: 'image/jpeg',
          upsert: true 
        });

      if (uploadError) throw uploadError;

      // 3. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('usuarios')
        .getPublicUrl(`perfiles/${fileName}`);

      // 4. Actualizar tabla 'jugadores'
      const { error: dbError } = await supabase
        .from('jugadores')
        .update({ avatar_url: publicUrl })
        .eq('uid', userId);

      if (dbError) throw dbError;

      Alert.alert("¡ÉXITO!", "Tu perfil ha sido actualizado.");
    } catch (error: any) {
      // Manejo específico del error de Bucket
      const mensaje = error.message === "Bucket not found" 
        ? "El contenedor 'usuarios' no existe o no tiene políticas RLS activas."
        : error.message;
      Alert.alert("Error de Conexión", mensaje);
      console.log("Detalle:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Estilo ID similar a tu Login */}
      <Text style={styles.sessionTitle}>
        SESSION_ID: {userId ? userId.substring(0, 12).toUpperCase() : "CARGANDO..." }
      </Text>

      <View style={styles.imageWrapper}>
        <View style={styles.glowBorder}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholder]}>
              <Text style={styles.placeholderText}>SIN DATOS</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.btnAction} onPress={pickImage}>
          <Text style={styles.btnActionText}>GALERÍA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnAction} onPress={takePhoto}>
          <Text style={styles.btnActionText}>CÁMARA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.uploadButton, uploading && { opacity: 0.5 }]} 
        onPress={subirImagenYActualizar}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.btnText}>ACTUALIZAR PERFIL</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0c', // Negro Cyberpunk de tu Login
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 25 
  },
  sessionTitle: { 
    fontSize: 10, 
    color: '#00fbff', 
    marginBottom: 40, 
    letterSpacing: 2, 
    fontWeight: '900' 
  },
  imageWrapper: { 
    marginBottom: 50 
  },
  glowBorder: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: '#00fbff15', // Glow de tu Login
    shadowColor: '#00fbff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  avatar: { 
    width: 180, 
    height: 180, 
    borderRadius: 90, 
    borderWidth: 2, 
    borderColor: '#00fbff' 
  },
  placeholder: { 
    backgroundColor: '#16161a', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  placeholderText: { 
    color: '#444', 
    fontWeight: 'bold', 
    letterSpacing: 2 
  },
  row: { 
    flexDirection: 'row', 
    gap: 15, 
    marginBottom: 40 
  },
  btnAction: { 
    backgroundColor: '#16161a', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333'
  },
  btnActionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  uploadButton: { 
    backgroundColor: '#00fbff', // Cian Neón
    padding: 18, 
    borderRadius: 12, 
    width: '100%', 
    alignItems: 'center',
    elevation: 8
  },
  btnText: { 
    color: '#000', 
    fontWeight: '900', 
    fontSize: 16,
    letterSpacing: 1
  }
});