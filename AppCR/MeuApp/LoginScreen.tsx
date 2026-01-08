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
import styles from '../MeuApp/styles/LoginScreenStyles';

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Simulação de login bem-sucedido para fluxo de UI
    Alert.alert('Sucesso', 'Bem-vindo!');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? styles.containerDark : styles.containerLight]}>
      <View style={styles.content}>
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