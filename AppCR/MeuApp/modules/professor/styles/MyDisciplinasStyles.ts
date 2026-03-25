import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  headerSection: { width: '100%', marginBottom: 25 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 13, color: '#64748b' },
  
  subjectCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectInfo: { flex: 1, marginLeft: 16 },
  subjectName: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  courseTag: { fontSize: 12, color: '#64748b' },
  
  tagRow: { flexDirection: 'row', marginTop: 8 },
  infoTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: { fontSize: 11, marginLeft: 4, color: '#2563eb', fontWeight: '700' },
  
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyText: { marginTop: 10, color: '#64748b', textAlign: 'center' }
});