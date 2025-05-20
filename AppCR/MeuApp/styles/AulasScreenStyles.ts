import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#1e3a8a', // Azul escuro
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#cbd5e1', // Fundo do progresso
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563eb', // Azul claro para o progresso
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionsContainer: {
    padding: 20,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a', // Azul escuro
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  sectionCardText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;