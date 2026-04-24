import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 15 },
  headerSection: { marginBottom: 25 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  
  // Card de Resumo (Média)
  scoreOverview: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
  },
  averageValue: { fontSize: 42, fontWeight: '800', color: '#2563eb' },
  averageLabel: { fontSize: 12, fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },

  // Lista de Notas
  listTitle: { fontSize: 16, fontWeight: '700', marginBottom: 15 },
  notaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  notaIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notaInfo: { flex: 1 },
  notaDesc: { fontSize: 15, fontWeight: '600' },
  notaDate: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  notaValueContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  notaValue: { fontSize: 18, fontWeight: '800' }
});