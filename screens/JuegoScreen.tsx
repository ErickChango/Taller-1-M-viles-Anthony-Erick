import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

const { width, height } = Dimensions.get('window');

export default function JuegoScreen({ route, navigation }: any) {
  const { username, userId } = route.params || { username: 'Piloto', userId: null };
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);

  const [pos, setPos] = useState({ 
    t: height / 2 - 50, 
    l: width / 2 - 50 
  });

  useEffect(() => {
    let timer: any;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      finalizarJuego();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const finalizarJuego = async () => {
    setIsActive(false);
    try {
      const { data: registro } = await supabase
        .from('ranking')
        .select('puntos')
        .eq('usuario', username)
        .maybeSingle();

      const recordAnterior = registro?.puntos || 0;

      if (score > recordAnterior) {
        await supabase.from('ranking').upsert({ 
          usuario: username, 
          puntos: score,
          id: userId 
        });
        Alert.alert("🔥 ¡NUEVO RÉCORD!", `¡Has establecido una marca de ${score} puntos!`);
      } else {
        Alert.alert("MISIÓN FINALIZADA", `Puntos: ${score}\nRécord: ${recordAnterior}`);
      }
      navigation.navigate('Ranking'); 
    } catch (error: any) {
      console.log("Error:", error.message);
    }
    setTimeLeft(30);
    setScore(0);
    setPos({ t: height / 2 - 50, l: width / 2 - 50 });
  };

  const tocarMosquito = () => {
    if (!isActive) setIsActive(true);
    setScore(s => s + 1);

    const margin = 100; 
    const safeTop = Math.random() * (height - 250) + 150; 
    const safeLeft = Math.random() * (width - margin);

    setPos({ t: safeTop, l: safeLeft });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.playerBox}>
          <Text style={styles.playerLabel}>PILOTO</Text>
          <Text style={styles.playerName}>{username.toUpperCase()}</Text>
        </View>
        
        <View style={styles.mainInfo}>
          <Text style={[styles.timer, timeLeft <= 5 && styles.urgent]}>{timeLeft}s</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </View>
      </View>

      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity 
          activeOpacity={0.8}
          style={[styles.target, { top: pos.t, left: pos.l }]} 
          onPress={tocarMosquito}
        >
          <View style={styles.glow}>
            <Text style={{fontSize: 50}}>🦟</Text>
          </View>
        </TouchableOpacity>
      </View>

      {!isActive && score === 0 && (
        <View style={styles.startOverlay}>
          <Ionicons name="finger-print" size={50} color="#00fbff22" />
          <Text style={styles.startText}>TOCA EL OBJETIVO</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050507' },
  header: { 
    paddingTop: 50, 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    zIndex: 100
  },
  playerBox: { justifyContent: 'center' },
  playerLabel: { color: '#444', fontSize: 10, fontWeight: 'bold' },
  playerName: { color: '#00fbff', fontWeight: 'bold' },
  mainInfo: { alignItems: 'flex-end' },
  timer: { color: '#fff', fontSize: 24, fontWeight: '900', fontFamily: 'monospace' },
  urgent: { color: '#ff4444' },
  scoreText: { color: '#00fbff', fontSize: 40, fontWeight: '900' },
  target: { 
    position: 'absolute', 
    width: 100, 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  glow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 251, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 251, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none'
  },
  startText: { color: '#222', marginTop: 10, fontWeight: 'bold', letterSpacing: 2 }
});
