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
    fontSize: 26, 
    fontWeight: '800',
    letterSpacing: -0.5
  },
  cardConteudo: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    // Sombras removidas como solicitado anteriormente
    elevation: 0,
    shadowOpacity: 0,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  nomeConteudo: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  tipoBadge: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 23, 42, 0.8)', // Tom mais escuro/azulado para o overlay
    justifyContent: 'flex-end',
  },
  modalContent: { 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 24, 
    paddingBottom: 40, // Espaço extra para o teclado/home indicator
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  }
});

export default styles;