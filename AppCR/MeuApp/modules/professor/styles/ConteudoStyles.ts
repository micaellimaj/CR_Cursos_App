import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: { 
    flex: 1, 
    paddingHorizontal: 16, 
    paddingTop: 10,
    width: '100%' 
  },
  headerSection: { 
    width: '100%', 
    marginBottom: 20, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold' 
  },
  cardConteudo: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nomeConteudo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipoBadge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalContent: { 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25, 
    padding: 24, 
    maxHeight: '90%',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  }
});

export default styles;