import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  Text, 
  View, 
  RefreshControl,
  StatusBar
} from 'react-native';
import { supabase } from '../superbase/SuperbaseConfig'; 

export default function PuntuacionScreen() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRanking = async () => {
    try {
      const { data, error } = await supabase
        .from('ranking')
        .select('*')
        .order('puntos', { ascending: false });
      
      if (error) throw error;
      setRanking(data || []);
    } catch (error: any) {
      console.error("Error cargando datos:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRanking();
    const channel = supabase
      .channel('cambios_ranking')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'ranking' }, 
          () => fetchRanking()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderItem = ({ item, index }: any) => {
    // Estilos especiales para el podio
    const isTop3 = index < 3;
    const colors = ['#f1c40f', '#bdc3c7', '#e67e22']; // Oro, Plata, Bronce

    return (
      <View style={[styles.card, isTop3 && { borderColor: colors[index], borderWidth: 1 }]}>
        <View style={styles.userInfo}>
          <View style={[styles.rankCircle, isTop3 && { backgroundColor: colors[index] }]}>
            <Text style={[styles.rankText, isTop3 && { color: '#0f172a' }]}>{index + 1}</Text>
          </View>
          <Text style={styles.userName}>{item.usuario}</Text>
        </View>
        <View style={styles.pointsBadge}>
          <Text style={styles.pointsValue}>{item.puntos}</Text>
          <Text style={styles.ptsLabel}>PTS</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HALL OF FAME</Text>
        <View style={styles.underline} />
      </View>

      <FlatList
        data={ranking}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={() => { setRefreshing(true); fetchRanking(); }} 
            tintColor="#2ecc71"
          />
        }
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay datos todavía...</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a', 
    paddingHorizontal: 20 
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center'
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '900', 
    color: '#fff', 
    letterSpacing: 3 
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: '#2ecc71',
    marginTop: 10,
    borderRadius: 2
  },
  listContent: {
    paddingBottom: 40
  },
  card: {
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  userInfo: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  rankCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },
  userName: { 
    fontSize: 17, 
    color: '#f8fafc', 
    fontWeight: '600' 
  },
  pointsBadge: { 
    alignItems: 'flex-end'
  },
  pointsValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#2ecc71',
  },
  ptsLabel: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'bold',
    marginTop: -5
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: '#64748b',
    fontSize: 16,
    fontStyle: 'italic'
  }
});