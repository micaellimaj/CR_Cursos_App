import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa', // Cor de fundo clara
  },
  loadingIndicator: {
    marginBottom: 20, // Espaço entre o indicador e o texto
  },
  loadingText: {
    fontFamily: 'Poppins', // Fonte Poppins
    fontSize: 16,
    color: '#000', // Preto
    textAlign: 'center', // Centraliza o texto
    paddingHorizontal: 20,
  },
});

export default styles;