import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function PuntucacionScreen() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data } = await supabase.from('ranking').select('*').order('puntos', { ascending: false });
      setRanking(data || []);
      setLoading(false);
    };
    fetchRanking();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>TOP CAZADORES</Text>
      <FlatList
        data={ranking}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.userInfo}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.userName}>{item.usuario}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.pointsText}>{item.puntos} PTS</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 20 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#2c3e50', textAlign: 'center', marginBottom: 20, marginTop: 30 },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  rank: { fontSize: 18, fontWeight: 'bold', color: '#2ecc71', marginRight: 15 },
  userName: { fontSize: 18, color: '#34495e', fontWeight: '500' },
  badge: { backgroundColor: '#2ecc71', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  pointsText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});