import { StyleSheet } from 'react-native';

export const getAlunoHomeStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 40,
      marginBottom: 10
    },
    subtitle: {
      color: '#64748b',
      fontSize: 14,
      marginTop: 4
    },
    content: {
      padding: 20,
    },
    mainCard: {
      backgroundColor: '#2563eb',
      borderRadius: 16,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    mainCardTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    mainCardSub: {
      color: 'rgba(255,255,255,0.8)',
      fontSize: 13,
      marginTop: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isLight ? '#1e293b' : '#f8fafc',
      marginBottom: 16,
    },
    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    // Estilo do Card de Estatística
    statGridCard: {
      width: '48%',
      padding: 20,
      borderRadius: 16,
      alignItems: 'center',
      marginBottom: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    iconCircle: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    statNumber: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    statLabel: {
      color: '#64748b',
      fontSize: 12,
      fontWeight: '500',
      marginTop: 4,
      textAlign: 'center'
    },
    footerInfo: {
      marginTop: 20,
      alignItems: 'center',
      paddingBottom: 40,
    },
    footerText: {
      color: '#94a3b8',
      fontSize: 12,
    },
  });
};