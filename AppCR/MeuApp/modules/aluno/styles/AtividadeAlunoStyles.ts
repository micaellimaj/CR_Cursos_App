import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 15, width: '100%' },
  headerSection: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  cardAtividade: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'column',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  tituloAtividade: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
  descricao: { fontSize: 14, color: '#64748b', lineHeight: 20, marginBottom: 15 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  deadlineText: { fontSize: 12, fontWeight: '600', marginLeft: 6 },
  emptyContainer: { alignItems: 'center', marginTop: 60 }
});