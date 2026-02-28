import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, 
  Alert, Image, ActivityIndicator 
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/LoginScreenStyles';
import api from '../../../config/api';
import { loginUser } from '../controllers/authController';
import { useAuth } from '../../../contexts/AuthContext';

export default function LoginScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { login } = useAuth();
  const isDarkTheme = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Erro', 'Preencha todos os campos');
    return;
  }

  setLoading(true);
  try {
    const data = await loginUser(email, password);

    login(data); 

    Alert.alert('Sucesso', `Bem-vindo, ${data.nome}!`);

  } catch (error: any) {
    Alert.alert('Falha no Login', error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={[styles.container, isDarkTheme ? styles.containerDark : styles.containerLight]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={
              isDarkTheme
                ? require('../../../assets/logoCR.png')
                : require('../../../assets/logoCRcursos.png')
            }
            style={styles.logoImage}
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, isDarkTheme ? styles.inputDark : styles.inputLight]}
            placeholder="Email"
            placeholderTextColor={isDarkTheme ? '#cbd5e1' : '#65676b'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading} 
          />

          <TextInput
            style={[styles.input, isDarkTheme ? styles.inputDark : styles.inputLight]}
            placeholder="Senha"
            placeholderTextColor={isDarkTheme ? '#cbd5e1' : '#65676b'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity 
            style={[
              styles.loginButton, 
              isDarkTheme ? styles.loginButtonDark : styles.loginButtonLight,
              { opacity: loading ? 0.7 : 1 }
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}