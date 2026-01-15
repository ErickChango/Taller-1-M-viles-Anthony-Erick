import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ route, navigation }: any) {
  const { username } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido,</Text>
      <Text style={styles.user}>{username}!</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Main', { username })}>
        <Text style={styles.btnText}>EMPEZAR PARTIDA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2ecc71' },
  title: { fontSize: 24, color: '#fff' },
  user: { fontSize: 45, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
  btn: { backgroundColor: '#fff', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  btnText: { color: '#2ecc71', fontWeight: 'bold' }
});