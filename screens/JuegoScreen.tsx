import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen({ route }: any) {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ t: height / 2, l: width / 2 - 35 });

  const moveMosquito = async () => {
    const nextScore = score + 1;
    setScore(nextScore);
    
    setPos({
      t: Math.random() * (height - 350) + 150,
      l: Math.random() * (width - 100) + 20
    });

    try {
      await supabase
        .from('ranking')
        .upsert({ usuario: username, puntos: nextScore }, { onConflict: 'usuario' });
    } catch (err) {
      console.log("Error de red");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fondo decorativo sutil */}
      <View style={[styles.glow, { top: -50, left: -50 }]} />

      <View style={styles.header}>
        <View style={styles.playerBadge}>
          <Text style={styles.label}>PLAYER</Text>
          <Text style={styles.userText}>{username}</Text>
        </View>
        
        <View style={styles.scoreBadge}>
          <Text style={styles.pointsText}>{score}</Text>
          <Text style={styles.label}>PTS</Text>
        </View>
      </View>

      <TouchableOpacity 
        activeOpacity={0.7}
        style={[styles.mosquitoContainer, { top: pos.t, left: pos.l }]} 
        onPress={moveMosquito}
      >
        <Text style={styles.mosquitoEmoji}>🦟</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¡TOCA AL MOSQUITO!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a', // Fondo azul oscuro petróleo
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(34, 197, 94, 0.05)', // Brillo verde muy suave
  },
  header: { 
    marginTop: 60, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center'
  },
  playerBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  scoreBadge: {
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 20,
    minWidth: 80,
    elevation: 5,
  },
  label: { 
    fontSize: 10, 
    color: '#64748b', 
    fontWeight: '900',
    letterSpacing: 1
  },
  userText: { 
    fontSize: 18, 
    color: '#f8fafc', 
    fontWeight: 'bold' 
  },
  pointsText: { 
    fontSize: 32, 
    color: '#22c55e', 
    fontWeight: '900',
    lineHeight: 35
  },
  mosquitoContainer: { 
    position: 'absolute',
    padding: 10,
  },
  mosquitoEmoji: {
    fontSize: 75,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center'
  },
  footerText: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 3
  }
});