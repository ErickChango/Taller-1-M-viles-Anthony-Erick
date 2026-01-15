import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PerfilScreen({ route, navigation }: any) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.usernameText}>Usuario: {username}</Text>
      
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  usernameText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  logoutButton: { backgroundColor: '#34495e', padding: 15, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold' }
});