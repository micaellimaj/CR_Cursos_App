import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const getDynamicStyles = (isLightTheme: boolean) => ({
  container: {
    backgroundColor: isLightTheme ? '#e0f2fe' : '#1e3a8a', // Azul claro para claro, azul escuro para escuro
  },
  content: {
    backgroundColor: isLightTheme ? '#e0f2fe' : '#1e3a8a', // Fundo do conteúdo
  },
  input: {
    backgroundColor: isLightTheme ? '#e0f2fe' : '#1e3a8a', // Fundo dos inputs
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    paddingHorizontal: 20, // Espaçamento lateral
  },
  content: {
    width: '100%',
    maxWidth: 400, // Limita a largura máxima para telas maiores
    padding: 20,
    borderRadius: 10, // Bordas arredondadas
    elevation: 10, // Sombra para Android
    shadowColor: '#030', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30, // Espaçamento abaixo do logo
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e2f33',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#65676b',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dddfe2',
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2563eb',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1877f2',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dddfe2',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#65676b',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dddfe2',
  },
  googleText: {
    fontWeight: '500',
    color: '#2e2f33',
  },
});

export default styles;