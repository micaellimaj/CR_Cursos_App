import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        {/* Logo com ícone e título */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/logo.png')} // Substitua com sua imagem de logo
            style={styles.logoImage}
          />
          <Text style={[styles.logoText, { color: isLightTheme ? '#2e2f33' : '#e2e8f0' }]}>
            CR Cursos
          </Text>
          <Text style={[styles.subtitle, { color: isLightTheme ? '#65676b' : '#cbd5e1' }]}>
            Conecte-se com sua conta
          </Text>
        </View>

        {/* Formulário de login */}
        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                color: isLightTheme ? '#000' : '#fff',
              },
            ]}
            placeholder="Email ou telefone"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                color: isLightTheme ? '#000' : '#fff',
              },
            ]}
            placeholder="Senha"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Botão de login */}
          <TouchableOpacity style={[styles.loginButton, { backgroundColor: isLightTheme ? '#2e2f33' : '#2563eb' }]}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Link para "esqueceu a senha" alinhado à direita */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: isLightTheme ? '#1877f2' : '#60a5fa' }]}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          {/* Divisor visual */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: isLightTheme ? '#dadde1' : '#374151' }]} />
            <Text style={[styles.dividerText, { color: isLightTheme ? '#65676b' : '#9ca3af' }]}>ou</Text>
            <View style={[styles.dividerLine, { backgroundColor: isLightTheme ? '#dadde1' : '#374151' }]} />
          </View>

          {/* Botões sociais lado a lado */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <FontAwesome5 name="google" size={20} color="#db4437" style={{ marginRight: 8 }} />
              <Text style={[styles.googleText, { color: isLightTheme ? '#2e2f33' : '#fff' }]}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <FontAwesome5 name="facebook-f" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.facebookText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Área inferior com link de cadastro */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.createAccountButton, { backgroundColor: isLightTheme ? '#42b72a' : '#16a34a' }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.createAccountText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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