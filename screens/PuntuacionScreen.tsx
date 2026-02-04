import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { supabase } from '../superbase/SuperbaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function PuntuacionScreen() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchRanking();
    }, [])
  );

  const fetchRanking = async () => {
    try {
      const { data, error } = await supabase
        .from('ranking')
        .select('*')
        .order('puntos', { ascending: false });

      if (error) throw error;
      setRanking(data || []);
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: any) => {
    const isTop = index < 3;
    return (
      <View style={[styles.card, isTop && styles.cardTop]}>
        <Text style={[styles.pos, isTop && styles.topText]}>
          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
        </Text>
        <View style={styles.userSection}>
          <Text style={styles.userName}>{item?.usuario || 'Anónimo'}</Text>
        </View>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreText}>{item?.puntos || 0}</Text>
          <Text style={styles.ptsLabel}>PTS</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Ionicons name="trophy" size={30} color="#00fbff" />
        <Text style={styles.title}>HALL OF FAME</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00fbff" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={ranking}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>SIN REGISTROS</Text>}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050507', padding: 20 },
  header: { marginTop: 50, marginBottom: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 15 },
  title: { color: '#00fbff', fontSize: 24, fontWeight: '900', letterSpacing: 4 },
  card: { backgroundColor: '#111', flexDirection: 'row', padding: 18, borderRadius: 15, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  cardTop: { borderColor: '#00fbff44', backgroundColor: '#0a1a1a' },
  pos: { color: '#444', fontSize: 18, fontWeight: 'bold', width: 45 },
  topText: { color: '#00fbff' },
  userSection: { flex: 1 },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  scoreSection: { alignItems: 'flex-end' },
  scoreText: { color: '#00fbff', fontSize: 22, fontWeight: '900' },
  ptsLabel: { color: '#444', fontSize: 9 },
  empty: { color: '#444', textAlign: 'center', marginTop: 50 }
});