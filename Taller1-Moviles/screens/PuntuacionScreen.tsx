import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig';

export default function PuntucacionScreen() {
  const [ranking, setRanking] = useState<any[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const { data } = await supabase.from('ranking').select('*').order('puntos', { ascending: false });
      setRanking(data || []);
    };
    fetchRanking();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de Posiciones</Text>
      <FlatList
        data={ranking}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text>{index + 1}. {item.usuario}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.puntos} pts</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderColor: '#eee' }
});