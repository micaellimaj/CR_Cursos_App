import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 10, width: '100%'},
  headerSection: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', letterSpacing: 0.5 },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 2 },
  
  // Tabs Estilo Botão para Aluno/Professor
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabButtonActive: { backgroundColor: '#1e3a8a' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  tabTextActive: { color: '#fff' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 12,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    width: '100%',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15 },

  // CARD IDENTICO À IMAGEM DE CURSOS
  userCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  userInfo: { flex: 1, marginLeft: 15 },
  userName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  userEmail: { fontSize: 13, color: '#64748b' },
  userBadge: { // Igual ao código do curso (CC-101)
    fontSize: 12, 
    color: '#1e3a8a', 
    fontWeight: '700',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4
  },
  
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 10, marginLeft: 4 },

  // MODAL IDENTICO À IMAGEM DE CURSOS
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 24, maxHeight: '90%', width: '100%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  
  inputGroup: { marginBottom: 15 },
  inputLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#475569' },
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
    marginBottom: 30,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  createButtonContainer: {
    width: '100%',
    marginBottom: 15, // Espaço entre o botão e a barra de busca
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
});

export default styles;