import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen({ route, navigation }: any) {

  const { username, userId } = route.params || { username: 'Cazador', userId: null };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.glowEffectTop} />
      
      <View style={styles.card}>
        <Ionicons name="shield-checkmark-outline" size={80} color="#00fbff" style={styles.icon} />
        <Text style={styles.statusText}>SISTEMA AUTORIZADO</Text>
        <Text style={styles.welcomeText}>¡BIENVENIDO,</Text>
        <Text style={styles.usernameText}>{username.toUpperCase()}!</Text>
        <View style={styles.divider} />
        <Text style={styles.instructionText}>Prepárate para la misión</Text>

        <TouchableOpacity 
          style={styles.btnPrimary} 
          onPress={() => navigation.replace('App', { username, userId })} 
        >
          <Text style={styles.btnText}>ACCEDER AL NEXO</Text>
          <Ionicons name="arrow-forward-outline" size={20} color="#000" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.glowEffectBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0c', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  glowEffectTop: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(0, 251, 255, 0.15)',
    filter: 'blur(70px)',
  },
  glowEffectBottom: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 0, 255, 0.1)',
    filter: 'blur(70px)',
  },
  card: {
    width: '90%',
    maxWidth: 450,
    padding: 40,
    backgroundColor: '#16161a',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    shadowColor: '#00fbff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  icon: {
    marginBottom: 20,
    textShadowColor: '#00fbff',
    textShadowRadius: 10,
  },
  statusText: {
    color: '#00fbff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5,
  },
  welcomeText: { 
    fontSize: 28, 
    fontWeight: '300', 
    color: '#fff', 
    letterSpacing: 2 
  },
  usernameText: {
    fontSize: 40,
    fontWeight: '900',
    color: '#00fbff',
    letterSpacing: 4,
    textShadowColor: '#00fbff',
    textShadowRadius: 15,
    marginTop: 5,
    marginBottom: 20,
  },
  divider: {
    width: 80,
    height: 3,
    backgroundColor: '#00fbff',
    borderRadius: 2,
    marginVertical: 25,
  },
  instructionText: {
    color: '#999',
    fontSize: 14,
    marginBottom: 30,
    fontStyle: 'italic',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00fbff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
    shadowColor: '#00fbff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  btnText: { 
    color: '#000', 
    fontWeight: '900', 
    letterSpacing: 1.5, 
    fontSize: 16 
  },
});