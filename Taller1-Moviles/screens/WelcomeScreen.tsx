import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface WelcomeProps {
  route: { params?: { username?: string } };
  navigation: any;
}

export default function WelcomeScreen({ route, navigation }: WelcomeProps) {

  const username = route?.params?.username || 'Invitado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido,</Text>
      <Text style={styles.user}>{username}!</Text>
      
      <TouchableOpacity 
        style={styles.btn} 
        onPress={() => navigation.replace('Main', { username })}
      >
        <Text style={styles.btnText}>EMPEZAR PARTIDA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#2ecc71' 
  },
  title: { 
    fontSize: 24, 
    color: '#fff' 
  },
  user: { 
    fontSize: 45, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 40,
    textAlign: 'center'
  },
  btn: { 
    backgroundColor: '#fff', 
    paddingHorizontal: 40, 
    paddingVertical: 15, 
    borderRadius: 30,
   
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  btnText: { 
    color: '#2ecc71', 
    fontWeight: 'bold',
    fontSize: 16
  }
});