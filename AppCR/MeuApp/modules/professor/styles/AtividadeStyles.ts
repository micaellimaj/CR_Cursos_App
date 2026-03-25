import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 10, width: '100%' },
  headerSection: { 
    width: '100%', 
    marginBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  cardAtividade: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  infoContainer: { flex: 1 },
  nomeAtividade: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  descricao: { fontSize: 13, color: '#64748b', marginBottom: 8 },
  footerCard: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  deadline: { fontSize: 11, color: '#ef4444', marginLeft: 4, fontWeight: '600' },
  
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    padding: 24, 
    maxHeight: '90%', 
    width: '100%' 
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 10 },
  typeSelector: { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between' },
  typeButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#cbd5e1',
    width: '30%',
    alignItems: 'center'
  }
});