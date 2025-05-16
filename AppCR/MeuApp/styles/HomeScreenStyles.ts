import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  card: {
    backgroundColor: '#1e3a8a', // Azul escuro alternativo
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold', // Fonte bold
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', // Fonte bold
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2563eb',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaçamento uniforme entre os grids
  },
  gridCard: {
    backgroundColor: '#1e3a8a', // Azul escuro para ambos os temas
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%', // Cada grid ocupa 48% da largura
  },
  gridCardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#fff', // Texto branco para contraste
    textAlign: 'center',
    fontWeight: 'bold', // Fonte bold
  },
  title: {
    fontSize: 16, // Diminuído o tamanho da fonte
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
    textAlign: 'left', // Alinhado ao canto esquerdo
    marginLeft: 10, // Adicionado espaçamento à esquerda
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  expandButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginRight: 5,
  },
});

export default styles;