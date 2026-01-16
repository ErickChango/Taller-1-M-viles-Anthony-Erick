import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen({ route, navigation }: any) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>👨‍🚀</Text>
        </View>
        <Text style={styles.usernameText}>{username}</Text>
        <Text style={styles.rankText}>Rango: Novato</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>Nivel</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Logros</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Taller 1: Anthony & Erick</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 50 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatarContainer: {
    width: 120, height: 120, borderRadius: 60, backgroundColor: '#f1f2f6',
    justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#e74c3c', marginBottom: 15,
  },
  avatarEmoji: { fontSize: 60 },
  usernameText: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
  rankText: { fontSize: 16, color: '#e74c3c', fontWeight: '600' },
  statsContainer: {
    flexDirection: 'row', width: '80%', justifyContent: 'space-around',
    backgroundColor: '#f9f9f9', padding: 20, borderRadius: 15, marginBottom: 50,
  },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#2980b9' },
  statLabel: { fontSize: 14, color: '#7f8c8d' },
  logoutButton: { backgroundColor: '#34495e', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 20, color: '#bdc3c7', fontSize: 12 },
});