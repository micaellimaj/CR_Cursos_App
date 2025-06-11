import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/ProfilealunoStyles';
import { API_URL } from '@env';


// Definição da interface para os dados do aluno, conforme esperado do backend
interface AlunoData {
  full_name: string;
  email: string;
  telefone?: string; 
  matricula?: string;
  validade?: string;
  foto?: string | null; // URL da foto ou null
  password?: string; // Usado apenas para PUT, não é retornado pelo GET
  // Adicione aqui outros campos que seu backend possa retornar ou esperar para atualização
  // Ex: data_nascimento, nome_responsavel, etc.
}


export default function ProfileScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const { width } = useWindowDimensions();

  // Cores adaptáveis
  const cardBg = isLightTheme ? '#fff' : '#23272f';
  const divider = isLightTheme ? '#e1e1e1' : '#334155';
  const mainText = isLightTheme ? '#2563eb' : '#fff';
  const subText = isLightTheme ? '#555' : '#cbd5e1';
  const label = isLightTheme ? '#2563eb' : '#60a5fa';
  const iconColor = isLightTheme ? '#2563eb' : '#60a5fa';
  const bgScreen = isLightTheme ? '#f5f7fa' : '#181a20';

  // Responsividade do cartão
  const cardWidth = width > 440 ? 400 : width * 0.92;
  const avatarSize = width > 400 ? 60 : width * 0.14;

  const [user, setUser] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '*******',
    matricula: '',
    validade: '',
    foto: null,
  });

  const [passwordInput, setPasswordInput] = useState('********'); // Estado separado para o campo de senha
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  // Função para formatar o telefone (se precisar enviar formatado ou exibir)
  const formatPhone = (value: string) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    // Aplica a máscara (XX) XXXXX-XXXX
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2')
        .slice(0, 15); // Garante que não exceda 15 caracteres (com máscara)
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const id = await AsyncStorage.getItem('userId');

      if (!token || !id) {
        setLoading(false);
        Alert.alert('Erro', 'Sessão expirada ou não encontrada. Por favor, faça login novamente.');
        // Opcional: navigation.navigate('Login'); para redirecionar
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/alunos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setUser({
          fullName: data.full_name || '',
          phone: data.telefone || '',
          email: data.email || '',
          password: '********',
          matricula: data.matricula || '',
          validade: data.validade || '',
          foto: data.foto || null,
        });
        setPasswordInput('********');
      } catch (error) {
    if (axios.isAxiosError(error)) { // Verifica se é um erro do Axios
      console.error('Erro ao buscar dados do aluno:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil. ' + (error.response?.data?.message || 'Verifique sua conexão.'));
    } else {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    }
  } finally {
    setLoading(false);
  }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const id = await AsyncStorage.getItem('userId');

    if (!token || !id) {
      Alert.alert('Erro', 'Sessão expirada. Por favor, faça login novamente para atualizar.');
      return;
    }

    // Payload para o PUT, tipado com Partial<AlunoData> para enviar apenas campos alterados
    const updatePayload: Partial<AlunoData> = {
      full_name: user.fullName, // Mapeia fullName para full_name do backend
      telefone: formatPhone(user.phone || ''), // Mapeia phone para telefone do backend e formata
    };
// Apenas envia a senha se ela foi alterada (diferente de '********') e tem comprimento mínimo
    if (passwordInput !== '********') {
      if (passwordInput.length >= 6) {
        updatePayload.password = passwordInput;
      } else {
        Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres.');
        return; // Impede a chamada à API se a senha for inválida
      }
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/alunos/${id}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Garante que o tipo de conteúdo seja JSON
          },
        }
      );

      // Assumindo que o backend retorna um 'message' em caso de sucesso
      Alert.alert('Sucesso', response.data.message || 'Seus dados foram atualizados com sucesso!');
      setPasswordInput('********'); // Reseta o campo de senha após sucesso
    } catch (error) {
    if (axios.isAxiosError(error)) { // Verifica se é um erro do Axios
      console.error('Erro ao atualizar dados:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Não foi possível atualizar os dados. Tente novamente.';
      Alert.alert('Erro', errorMessage);
    } else {
      console.error('Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    }
  }
  };

  // Função genérica para lidar com mudanças nos inputs
  const handleChange = (field: keyof typeof user, value: string) => {
    if (field === 'phone') {
        setUser((prev) => ({ ...prev, [field]: formatPhone(value) }));
    } else {
        setUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgScreen }}>
        <ActivityIndicator size="large" color={mainText} />
        <Text style={{ marginTop: 10, color: subText }}>Carregando perfil...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgScreen }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
        <View
          style={[
            styles.card, // Usando o estilo 'card' definido em ProfilealunoStyles.js
            {
              backgroundColor: cardBg,
              width: cardWidth,
              shadowColor: '#000', // Manter sombra aqui ou no styles.card
              marginTop: 32,
              marginBottom: 32,
              borderRadius: 10,
              padding: 20,
            },
          ]}
        >
          {/* Cabeçalho */}
          <View style={[styles.header, { marginBottom: 15 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: mainText }]}>{user.fullName || 'Aluno'}</Text>
              <Text style={[styles.course, { color: subText }]}>Engenharia de Software</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={
                  user.foto
                    ? { uri: user.foto }
                    : require('./assets/aluno.png')
                }
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: avatarSize / 2,
                  backgroundColor: isLightTheme ? '#e5e7eb' : '#181a20',
                  borderWidth: 2,
                  borderColor: mainText,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Divisor */}
          <View style={[styles.divider, { backgroundColor: divider }]} />

          {/* Informações Acadêmicas */}
          <View style={{ marginBottom: 5 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { color: label }]}>Matrícula</Text>
              <Text style={[styles.value, { color: mainText }]}>{user.matricula || 'N/A'}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { color: label }]}>Validade</Text>
              <Text style={[styles.value, { color: mainText }]}>{user.validade || 'N/A'}</Text>
            </View>
          </View>

          {/* Título "Meus dados" */}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: mainText,
              marginTop: 10,
              marginBottom: 8,
            }}
          >
            Meus dados
          </Text>

          {/* Campos de dados pessoais */}
          <View style={{ marginBottom: 10 }}>
            {/* Email */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Email</Text>
                <Text style={{ color: mainText, fontSize: 16 }}>
                  {user.email}
                </Text>
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => Alert.alert('Informação', 'O e-mail não pode ser alterado diretamente no perfil.')}>
                <Feather name="copy" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            {/* Telefone */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Telefone</Text>
                <TextInput
                  style={{ color: mainText, fontSize: 16, borderBottomWidth: 1, borderColor: divider, paddingBottom: 2 }}
                  value={user.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => { /* Lógica para habilitar edição ou focar no input */ }}>
                <Feather name="edit" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            {/* Senha */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Senha</Text>
                <TextInput
                  style={{ color: mainText, fontSize: 16, borderBottomWidth: 1, borderColor: divider, paddingBottom: 2 }}
                  secureTextEntry
                  value={passwordInput} // Usa o estado separado da senha
                  onChangeText={(text) => setPasswordInput(text)}
                  placeholder="********"
                  placeholderTextColor={subText}
                />
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => { /* Lógica para habilitar edição ou focar no input */ }}>
                <Feather name="edit" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Divisor */}
          <View style={[styles.divider, { backgroundColor: divider }]} />

          {/* Botão de Atualização */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.updateButton,
                { backgroundColor: isLightTheme ? '#2563eb' : '#60a5fa' },
              ]}
              onPress={handleUpdate}
            >
              <Text style={styles.updateButtonText}>Atualizar Dados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}