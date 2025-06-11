import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  Alert,
  Image,
  Animated,
} from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/LoginScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';

export default function LoginScreen({ navigation, onLoginSuccess }: any) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));

  const showMessage = (type: 'success' | 'error', msg: string) => {
    if (type === 'success') setSuccessMsg(msg);
    if (type === 'error') setErrorMsg(msg);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setSuccessMsg('');
          setErrorMsg('');
        });
      }, 2200);
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage('error', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        senha: password,
      });

      const { token, tipo, id, nome } = response.data;

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userType', tipo);
      await AsyncStorage.setItem('userId', id);
      await AsyncStorage.setItem('userName', nome);

      showMessage('success', `Bem-vindo ao CR Cursos App!`);
      setEmail('');
      setPassword('');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 1200);

    } catch (error: any) {
      if (error.response) {
        showMessage('error', error.response.data || 'Erro desconhecido');
      } else {
        showMessage('error', 'Erro de Login');
      }
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? styles.containerDark : styles.containerLight]}>
      <View style={styles.content}>
        {/* Avisos de sucesso e erro */}
        {(successMsg || errorMsg) && (
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                position: 'absolute',
                top: 0, // Fica no topo da tela
                left: 0,
                right: 0,
                zIndex: 100,
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 0,
                alignItems: 'center',
              },
              successMsg
                ? { backgroundColor: '#22c55e' }
                : { backgroundColor: '#ef4444', borderWidth: 1, borderColor: '#b91c1c' },
            ]}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>
              {successMsg || errorMsg}
            </Text>
          </Animated.View>
        )}

        {/* Logo da CR */}
        <View style={styles.logoContainer}>
          <Image
            source={
              isDarkTheme
                ? require('./assets/logoCR.png')
                : require('./assets/logoCRcursos.png')
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