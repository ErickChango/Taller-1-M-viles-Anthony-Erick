import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen({ route }: any) {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ t: 250, l: 150 });

  const moveMosquito = async () => {
    const newScore = score + 1;
    setScore(newScore);
    setPos({
      t: Math.random() * (height - 250) + 80,
      l: Math.random() * (width - 80) + 10
    });
    await supabase.from('ranking').upsert([{ usuario: username, puntos: newScore }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.scoreText}>Jugador: {username}</Text>
        <Text style={styles.pointsText}>{score} Puntos</Text>
      </View>

      <TouchableOpacity 
        activeOpacity={0.6}
        style={[styles.mosquito, { top: pos.t, left: pos.l }]} 
        onPress={moveMosquito}
      >
        <Text style={{ fontSize: 70 }}>🦟</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c3e50' },
  header: {
    marginTop: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  scoreText: { fontSize: 16, color: '#ecf0f1', textTransform: 'uppercase' },
  pointsText: { fontSize: 32, color: '#2ecc71', fontWeight: 'bold' },
  mosquito: { position: 'absolute' }
});