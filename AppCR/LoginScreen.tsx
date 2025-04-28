import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/LoginScreenStyles'; // Importando os estilos
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.10:5000/login', {
        email,
        senha: password,
      });
  
      const { token, tipo, id, nome } = response.data;
  
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userType', tipo);
      await AsyncStorage.setItem('userId', id);
      await AsyncStorage.setItem('userName', nome);
  
      Alert.alert('Sucesso', `Bem-vindo, ${nome}!`);
  
      navigation.navigate('Home'); // ou o nome da sua tela inicial após login
  
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Erro ao logar', error.response.data || 'Erro desconhecido');
      } else {
        Alert.alert('Erro', 'Não foi possível conectar com o servidor');
      }
      console.error(error);
    }
  };
  

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
            placeholder="Email ou matrícula"
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
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: isLightTheme ? '#2e2f33' : '#2563eb' }]}
            onPress={handleLogin}
          >
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
            <Text style={[styles.dividerText, { color: isLightTheme ? '#65676b' : '#9ca3af' }]}>Faça login com Google, ou Cadastre-se</Text>
            <View style={[styles.dividerLine, { backgroundColor: isLightTheme ? '#dadde1' : '#374151' }]} />
          </View>

          {/* Botão social do Google */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <FontAwesome5 name="google" size={20} color="#db4437" style={{ marginRight: 8 }} />
              <Text style={[styles.googleText, { color: isLightTheme ? '#2e2f33' : '#fff' }]}>Google</Text>
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