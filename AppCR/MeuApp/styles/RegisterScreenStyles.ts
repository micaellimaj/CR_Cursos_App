import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#42b72a', // Verde
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  successText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  loginButton: {
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
 radioOuter: {
  width: 22,
  height: 22,
  borderRadius: 11,
  borderWidth: 2,
  borderColor: '#2563eb',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 8,
  backgroundColor: '#f5f7fa',
},
radioOuterSelected: {
  borderColor: '#2563eb',
  backgroundColor: '#e0e7ff',
},
radioInner: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#2563eb',
},
radioLabel: {
  fontSize: 16,
},
radioLabelSelected: {
  color: '#2563eb',
  fontWeight: 'bold',
},

});

export default styles;