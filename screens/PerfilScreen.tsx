import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen({ route, navigation }: any) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      
      <View style={[styles.glow, { top: -40, right: -40, backgroundColor: '#e74c3c20' }]} />

      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👨‍🚀</Text>
          </View>
          <View style={styles.onlineBadge} />
        </View>
        
        <Text style={styles.usernameText}>{username.toUpperCase()}</Text>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>RANGO: NOVATO</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>1</Text>
          <Text style={styles.statLabel}>NIVEL</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>LOGROS</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          activeOpacity={0.7}
          style={styles.logoutButton} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Taller 2 • Anthony & Erick</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f172a', 
    alignItems: 'center', 
    paddingTop: 80 
  },
  glow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  avatarWrapper: {
    marginBottom: 20,
  },
  avatarContainer: {
    width: 130, 
    height: 130, 
    borderRadius: 65, 
    backgroundColor: '#1e293b',
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: '#e74c3c',
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  avatarEmoji: { fontSize: 65 },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#2ecc71',
    borderWidth: 4,
    borderColor: '#0f172a'
  },
  usernameText: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#fff',
    letterSpacing: 1
  },
  rankBadge: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e74c3c'
  },
  rankText: { 
    fontSize: 12, 
    color: '#e74c3c', 
    fontWeight: 'bold',
    letterSpacing: 2
  },
  statsContainer: {
    flexDirection: 'row', 
    width: '85%', 
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    padding: 25, 
    borderRadius: 25, 
    marginBottom: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 12, color: '#64748b', fontWeight: 'bold', marginTop: 5 },
  menuContainer: {
    width: '85%',
  },
  logoutButton: { 
    backgroundColor: '#1e293b', 
    paddingVertical: 18, 
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)'
  },
  logoutText: { 
    color: '#94a3b8', 
    fontWeight: 'bold',
    letterSpacing: 1
  },
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    color: '#475569', 
    fontSize: 10,
    letterSpacing: 2 
  },
});