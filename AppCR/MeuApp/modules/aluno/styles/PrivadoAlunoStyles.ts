import { StyleSheet } from 'react-native';

export const getPrivadoAlunoStyles = (theme: 'light' | 'dark') => {
  const isLight = theme === 'light';

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    headerSection: {
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isLight ? '#1e293b' : '#f8fafc',
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: '#64748b',
      lineHeight: 20,
    },
    card: {
      backgroundColor: isLight ? '#ffffff' : '#1e293b',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isLight ? '#e2e8f0' : '#334155',
      // Sombra leve para destacar o conteúdo
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    badgeTurma: {
      backgroundColor: '#2563eb15',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      color: '#2563eb',
      fontSize: 11,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    dateText: {
      fontSize: 12,
      color: '#94a3b8',
    },
    messageText: {
      fontSize: 15,
      lineHeight: 24,
      color: isLight ? '#334155' : '#cbd5e1',
    },
    footer: {
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isLight ? '#f1f5f9' : '#334155',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 80,
      opacity: 0.5,
    },
    emptyText: {
      color: '#64748b',
      marginTop: 16,
      fontSize: 15,
      textAlign: 'center',
    }
  });
};