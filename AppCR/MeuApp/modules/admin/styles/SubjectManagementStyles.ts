import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%' 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 10,
    width: '100%' 
  },
  headerSection: { marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#64748b' },
  
  filterContainer: { marginBottom: 10, width: '100%' },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 10,
    height: 48,
    width: '100%',
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 15,
    minWidth: 0 
  },

  subjectCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  subjectInfo: { 
    flex: 1, 
    marginLeft: 12,
    marginRight: 8 
  },
  subjectHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flexWrap: 'wrap',
    marginBottom: 2 
  },
  subjectName: { 
    fontSize: 16, 
    fontWeight: 'bold',
  },
  subjectCode: { 
    fontSize: 10, 
    color: '#2563eb', 
    fontWeight: '700', 
    backgroundColor: 'rgba(37, 99, 235, 0.1)', 
    paddingHorizontal: 5, 
    borderRadius: 4, 
    marginLeft: 4,
  },
  courseTag: { fontSize: 12, color: '#64748b', marginTop: 2 },
  creditsTag: { fontSize: 12, color: '#2563eb', fontWeight: '600' },

  actionButtons: { 
    flexDirection: 'row',
    flexShrink: 0 
  },
  iconBtn: { padding: 8 },

  // --- PROPRIEDADES QUE ESTAVAM CAUSANDO O ERRO ---
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end',
    alignItems: 'center', // Garante que o conteúdo não "vaze" para os lados
    width: '100%',
  },
  modalContent: { 
  borderTopLeftRadius: 25, 
  borderTopRightRadius: 25, 
  padding: 24, 
  maxHeight: '90%',
  width: '100%', // Ocupa a largura total no mobile
  maxWidth: 600, // Limite para não ficar esticado demais em telas muito grandes (Tablets/Web)
  alignSelf: 'center',
},
modalHeader: { 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'center',
  marginBottom: 20,
  width: '100%', // Força o header a respeitar o limite do modal content
},
  inputGroup: { 
    marginBottom: 15,
    width: '100%'
  },
  inputLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginBottom: 8 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 12, 
    padding: 12, 
    fontSize: 16,
    width: '100%'
  },
  saveButton: { 
    backgroundColor: '#1e3a8a', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 20,
    width: '100%'
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});

export default styles;