import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    color: '#65676b',
    fontSize: 14,
  },
  notificationBadge: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mainCard: {
    backgroundColor: '#1e3a8a',
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
    color: '#cbd5e1',
    fontSize: 12,
    marginVertical: 8,
  },
  mainButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  mainButtonText: {
    color: '#1e3a8a',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Permite que os itens quebrem para a linha de baixo
  },
  gridCard: {
    backgroundColor: '#1e3a8a',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    marginBottom: 16, // Espaço entre as linhas de botões
  },
  gridCardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;