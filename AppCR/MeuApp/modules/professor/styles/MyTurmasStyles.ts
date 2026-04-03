import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 12, paddingTop: 10, width: '100%' },
  headerSection: { width: '100%', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#64748b' },
  
  subjectCard: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden'
  },
  cardMainContent: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
},
  iconContainer: {
    width: 42,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)', // Tom azul para Turmas
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectInfo: { flex: 1, marginLeft: 16 , justifyContent: 'center'},
  subjectName: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  courseTag: { fontSize: 11, color: '#64748b', maxWidth: '90%'},

  actionColumn: {
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: 8,
  gap: 10, 
},

  actionButton: {
    padding: 8,
  },

  miniBadgeButton: {
  backgroundColor: '#2563eb',
  padding: 8,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
},
  
  tagRow: { flexDirection: 'row', marginTop: 4 },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: { fontSize: 11, marginLeft: 4, fontWeight: '700' },
  
  emptyContainer: { 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 50 
  },
  emptyText: { 
    marginTop: 10, 
    color: '#64748b', 
    textAlign: 'center' 
  }
});