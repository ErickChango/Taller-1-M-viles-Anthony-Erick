import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen({ route }: any) {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ t: 200, l: 150 });

  const moveMosquito = async () => {
    const newScore = score + 1;
    setScore(newScore);
    setPos({
      t: Math.random() * (height - 300) + 50,
      l: Math.random() * (width - 100) + 20
    });
 
    await supabase.from('ranking').upsert([{ usuario: username, puntos: newScore }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreBoard}>Cazador: {username} | Puntos: {score}</Text>
      <TouchableOpacity style={[styles.mosquito, { top: pos.t, left: pos.l }]} onPress={moveMosquito}>
        <Text style={{ fontSize: 60 }}>🦟</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f2f6' },
  scoreBoard: { fontSize: 20, textAlign: 'center', marginTop: 20, fontWeight: 'bold' },
  mosquito: { position: 'absolute' }
});