import { StyleSheet, Dimensions, TextStyle, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  title: TextStyle;
  form: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  linkText: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  footerLink: TextStyle;
  body: ViewStyle;
  userTypeContainer: ViewStyle;
  userTypeButton: ViewStyle;
  userTypeButtonActive: ViewStyle;
  userTypeText: TextStyle;
  orDivider: TextStyle;
}

export const getGlobalStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    // ============================
    // Container Geral da Tela
    // ============================
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#f5f7fa' : '#0f172a',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    // ============================
    // Header (Cabeçalho)
    // ============================
    header: {
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme === 'light' ? '#333' : '#e2e8f0', // Cor do texto dinâmico
    },
    headerSubtitle: {
      fontSize: width * 0.04,
      color: theme === 'light' ? '#666' : '#cbd5e1',
      textAlign: 'center',
    },

    // ============================
    // Título Principal
    // ============================
    title: {
      fontSize: width * 0.08, // Tamanho responsivo
      fontWeight: 'bold',
      color: theme === 'light' ? '#333' : '#e2e8f0',
      textAlign: 'center',
      marginBottom: 30,
    },

    // ============================
    // Formulário (Inputs e Botões)
    // ============================
    form: {
      width: '100%',
      alignItems: 'center',
    },
    input: {
      width: width * 0.9,
      height: 50,
      borderColor: theme === 'light' ? '#ccc' : '#555', // Cor da borda dinâmica
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 15,
      paddingHorizontal: 15,
      backgroundColor: theme === 'light' ? '#fff' : '#1e293b', // Fundo dinâmico
      fontSize: 16,
      color: theme === 'light' ? '#000' : '#fff', // Cor do texto dinâmico
    },
    button: {
      width: width * 0.9,
      height: 50,
      backgroundColor: theme === 'light' ? '#007BFF' : '#2563eb', // Cor do botão dinâmica
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },

    // ============================
    // Links e Textos
    // ============================
    linkText: {
      marginTop: 15,
      color: theme === 'light' ? '#007BFF' : '#4f83ff', // Cor do link dinâmica
      textDecorationLine: 'underline',
      fontSize: 16,
    },

    // ============================
    // Footer (Rodapé)
    // ============================
    footer: {
      alignItems: 'center',
      marginTop: 20,
    },
    footerText: {
      fontSize: 16,
      color: theme === 'light' ? '#333' : '#e2e8f0',
    },
    footerLink: {
      color: theme === 'light' ? '#007BFF' : '#2563eb',
      fontWeight: 'bold',
    },

    // ============================
    // Body
    // ============================
    body: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ============================
    // User Type Selection
    // ============================
    userTypeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.9,
      marginBottom: 20,
    },
    userTypeButton: {
      flex: 1,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#e2e8f0' : '#1e293b',
      marginHorizontal: 5,
      borderRadius: 8,
    },
    userTypeButtonActive: {
      backgroundColor: theme === 'light' ? '#007BFF' : '#2563eb',
    },
    userTypeText: {
      color: theme === 'light' ? '#333' : '#e2e8f0',
      fontWeight: 'bold',
    },

    orDivider: {
      color: theme === 'light' ? '#666' : '#cbd5e1',
      textAlign: 'center',
      marginVertical: 15,
      fontSize: 16,
      width: '100%',
      position: 'relative',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
  });