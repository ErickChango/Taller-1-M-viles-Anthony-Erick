import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen({ route }: any) {
  const { username } = route.params;
  const [score, setScore] = useState(0);
  const [pos, setPos] = useState({ t: 200, l: 150 });

  const moveMosquito = () => {
    setScore(score + 1);
    setPos({
      t: Math.random() * (height - 300) + 50,
      l: Math.random() * (width - 100) + 20
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.scoreBoard}>Puntos: {score}</Text>
      <TouchableOpacity style={[styles.mosquito, { top: pos.t, left: pos.l }]} onPress={moveMosquito}>
        <Text style={{ fontSize: 60 }}>🦟</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scoreBoard: { fontSize: 24, textAlign: 'center', marginTop: 40 },
  mosquito: { position: 'absolute' }
});