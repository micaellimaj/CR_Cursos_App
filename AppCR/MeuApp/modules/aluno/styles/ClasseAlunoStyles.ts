import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 15,
    width: '100%' 
  },
  headerSection: { 
    width: '100%', 
    marginBottom: 25,
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 4
  },
  cardConteudo: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 0,
  },
  infoContainer: {
    flex: 1,
  },
  nomeConteudo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  tipoBadge: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  anexosContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f020',
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  anexoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb08',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    maxWidth: '100%'
  },
  anexoText: {
    color: '#2563eb',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#64748b',
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default styles;