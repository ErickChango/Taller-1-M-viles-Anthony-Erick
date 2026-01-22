import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

interface WelcomeProps {
  route: { params?: { username?: string } };
  navigation: any;
}

export default function WelcomeScreen({ route, navigation }: WelcomeProps) {
  const username = route?.params?.username || 'Invitado';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Elementos decorativos de fondo */}
      <View style={[styles.circle, { top: -50, left: -50, backgroundColor: '#27ae60' }]} />
      <View style={[styles.circle, { bottom: -80, right: -50, backgroundColor: '#1e8449' }]} />

      <View style={styles.content}>
        <Text style={styles.welcomeText}>¡HOLA,</Text>
        <Text style={styles.userText}>{username.toUpperCase()}!</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.description}>
          Prepárate para atrapar a todos los mosquitos. ¿Estás listo para el reto?
        </Text>

        <TouchableOpacity 
          activeOpacity={0.8}
          style={styles.btn} 
          onPress={() => navigation.replace('Main', { username })}
        >
          <Text style={styles.btnText}>EMPEZAR PARTIDA</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Taller 2 • Anthony & Erick</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1a1a1a', 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  circle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.4,
  },
  content: {
    width: '85%',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  welcomeText: { 
    fontSize: 18, 
    color: '#bdc3c7',
    letterSpacing: 4,
    fontWeight: '300'
  },
  userText: { 
    fontSize: 40, 
    fontWeight: '900', 
    color: '#2ecc71', 
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(46, 204, 113, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: '#2ecc71',
    borderRadius: 2,
    marginVertical: 25
  },
  description: {
    color: '#95a5a6',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 45
  },
  btn: { 
    backgroundColor: '#2ecc71', 
    width: '100%',
    paddingVertical: 18, 
    borderRadius: 15,
    elevation: 8,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 1
  },
  footerText: {
    position: 'absolute',
    bottom: 30,
    color: 'rgba(255,255,255,0.2)',
    fontSize: 11,
    letterSpacing: 2
  }
});