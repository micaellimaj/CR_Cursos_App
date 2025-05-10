import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
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
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  facebookButton: {
    backgroundColor: '#1877f2',
  },
  googleText: {
    fontWeight: '500',
  },
  facebookText: {
    fontWeight: '500',
    color: '#fff',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;