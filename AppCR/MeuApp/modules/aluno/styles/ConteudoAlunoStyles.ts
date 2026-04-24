import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  content: { 
    flex: 1, 
    paddingHorizontal: 20, 
    paddingTop: 15,
    width: '100%' 
  },
  headerSection: { 
    marginBottom: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800',
    letterSpacing: -0.5
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  cardConteudo: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoContainer: {
    flex: 1,
  },
  tituloConteudo: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  tipoText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 60 
  }
});