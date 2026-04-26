import { StyleSheet } from 'react-native';

export const getFrequenciaAlunoStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';
  return StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: isLight ? '#1e293b' : '#fff' },
    
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    statCard: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      backgroundColor: isLight ? '#fff' : '#1e293b',
      borderWidth: 1,
      borderColor: isLight ? '#e2e8f0' : '#334155',
      alignItems: 'center',
    },
    statValue: { fontSize: 22, fontWeight: 'bold', marginVertical: 4 },
    statLabel: { fontSize: 12, color: '#64748b', fontWeight: '600', textTransform: 'uppercase' },

    sectionTitle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      color: isLight ? '#475569' : '#94a3b8',
      marginBottom: 12 
    },
    historyCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      borderRadius: 12,
      backgroundColor: isLight ? '#fff' : '#1e293b',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: isLight ? '#f1f5f9' : '#334155',
    },
    dateContainer: { flex: 1 },
    dateText: { fontSize: 15, fontWeight: '600', color: isLight ? '#1e293b' : '#f8fafc' },
    obsText: { fontSize: 12, color: '#64748b', marginTop: 2 },
    
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    }
  });
};