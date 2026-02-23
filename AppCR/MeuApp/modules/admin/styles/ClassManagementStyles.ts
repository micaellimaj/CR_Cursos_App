import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 10, width: '100%' },
  headerSection: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#64748b' },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: 48,
    width: '100%',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, minWidth: 0 },

  classCard: {
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  classMainInfo: { flex: 1, marginLeft: 12 },
  className: { fontSize: 16, fontWeight: 'bold' },
  classSubDetails: { fontSize: 12, color: '#64748b', marginTop: 2 },
  
  // Tags de informação (Professor, Alunos)
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: { fontSize: 11, marginLeft: 4, color: '#475569', fontWeight: '600' },

  // Botões de Gerenciamento dentro do card
  manageButtons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 },
  actionTextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    marginTop: 4,
  },
  actionText: { fontSize: 11, fontWeight: '600', color: '#1e293b', marginLeft: 4 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end', alignItems: 'center' },
  modalContent: { borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 24, maxHeight: '90%', width: '100%', maxWidth: 600 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' },
  inputGroup: { marginBottom: 15, width: '100%' },
  inputLabel: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 12, fontSize: 16, width: '100%' },
  saveButton: { backgroundColor: '#1e3a8a', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15, marginBottom: 20 },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default styles;