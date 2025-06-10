import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Image
} from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/LoginScreenStyles'; // Importando os estilos
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        senha: password,
      });

      const { token, tipo, id, nome } = response.data;

      console.log('Token recebido do backend:', token); // Adicione este log
      console.log('Tipo de usuário recebido:', tipo); // Adicione este log

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userType', tipo);
      await AsyncStorage.setItem('userId', id);
      await AsyncStorage.setItem('userName', nome);

      console.log('Token salvo no AsyncStorage:', await AsyncStorage.getItem('userToken')); // Adicione este log para confirmar
      console.log('UserType salvo no AsyncStorage:', await AsyncStorage.getItem('userType')); // Adicione este log

      Alert.alert('Sucesso', `Bem-vindo, ${nome}!`);
      navigation.navigate('Home'); // Redireciona para a tela inicial após login
      // Limpar campos após o login
      setEmail('');
      setPassword('');

    } catch (error: any) {
      if (error.response) {
        Alert.alert('Erro ao logar', error.response.data || 'Erro desconhecido');
      } else {
        Alert.alert('Erro de Login:', error);
      }
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? styles.containerDark : styles.containerLight]}>
      <View style={styles.content}>
        {/* Logo da CR */}
        <View style={styles.logoContainer}>
          <Image
            source={
              isDarkTheme
                ? require('./assets/logoCR.png') // Logo para o tema dark
                : require('./assets/logoCRcursos.png') // Logo para o tema light
            }
            style={styles.logoImage}
          />
        </View>

        {/* Formulário de login */}
        <View style={styles.formContainer}>
          <TextInput
            style={[
              styles.input,
              isDarkTheme ? styles.inputDark : styles.inputLight,
            ]}
            placeholder="Email ou matrícula"
            placeholderTextColor={isDarkTheme ? '#cbd5e1' : '#65676b'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[
              styles.input,
              isDarkTheme ? styles.inputDark : styles.inputLight,
            ]}
            placeholder="Senha"
            placeholderTextColor={isDarkTheme ? '#cbd5e1' : '#65676b'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {/* Botão de login */}
          <TouchableOpacity 
            style={[
              styles.loginButton,
              isDarkTheme ? styles.loginButtonDark : styles.loginButtonLight,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}