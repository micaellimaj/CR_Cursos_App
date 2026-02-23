import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: { 
    flex: 1,
    paddingHorizontal: 16, // Espaçamento padrão mobile
    paddingTop: 10,
  },
  headerSection: { 
    marginBottom: 15 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    letterSpacing: 0.5 
  },
  subtitle: { 
    fontSize: 13, 
    color: '#64748b', 
    marginTop: 2 
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 12,
    height: 48, // Altura ideal para toque (touch target)
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 15 
  },

  listContainer: {
    paddingBottom: 20, // Respiro no final da lista
  },
  courseCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombras leves para Mobile
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  courseName: { 
    fontSize: 16, 
    fontWeight: 'bold',
    marginBottom: 2
  },
  courseCode: { 
    fontSize: 12, 
    color: '#2563eb', 
    fontWeight: '700',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  actionButtons: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: { 
    padding: 10, // Área de toque maior
    marginLeft: 4 
  },

  // MODAL MOBILE (Estilo Bottom Sheet ou Centralizado)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end', // Abre de baixo para cima (estilo mobile)
  },
  modalContent: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    maxHeight: '90%', // Não deixa o modal sumir no topo
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 8,
    color: '#475569'
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  saveButton: {
    backgroundColor: '#1e3a8a',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 30, // Espaço para não bater no teclado/home bar
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default styles;