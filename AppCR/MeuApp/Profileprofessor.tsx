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
import axios from 'axios';
import { useTheme } from './contexts/ThemeContext'; // Ajuste o caminho se necessário
import styles from './styles/ProfilealunoStyles'; // Reutilizando os mesmos estilos visuais
import { API_URL } from '@env';

// Definição da interface para os dados do professor
interface ProfessorData {
  full_name: string;
  email: string;
  telefone?: string; // Mapeado para 'phone' no estado
  data_nascimento?: string; // Mapeado para 'birthDate' no estado
  foto?: string | null; // URL da foto ou null
  password?: string; // Usado apenas para PUT, não é retornado pelo GET
  // Adicione outros campos específicos do professor que seu backend retornar
  // Ex: disciplina?: string;
}

export default function ProfileprofessorScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const { width } = useWindowDimensions();

  // Cores adaptáveis (mantidas as mesmas do aluno para consistência visual)
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

  // Estado para os dados do professor
  const [professor, setProfessor] = useState<ProfessorData>({
    full_name: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    foto: null,
    password: '********', // Valor padrão para o campo de senha
  });

  const [passwordInput, setPasswordInput] = useState('********'); // Estado separado para o campo de senha
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  // Função para formatar o telefone (reutilizada do perfil do aluno)
  const formatPhone = (value: string) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      return cleaned
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2')
        .slice(0, 15);
    }
  };

  // --- Função para buscar dados do professor (GET) ---
  useEffect(() => {
    const fetchProfessorData = async () => {
      setLoading(true);
      // Assumindo que o token e ID do professor são armazenados de forma diferente do aluno
      const token = await AsyncStorage.getItem('professorToken'); // Use uma chave diferente
      const id = await AsyncStorage.getItem('professorId');     // Use uma chave diferente

      if (!token || !id) {
        setLoading(false);
        Alert.alert('Erro', 'Sessão de professor expirada ou não encontrada. Por favor, faça login novamente.');
        return;
      }

      try {
        // Rota específica para professores
        const response = await axios.get<ProfessorData>(`${API_URL}/api/professores/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setProfessor({
          full_name: data.full_name || '',
          email: data.email || '',
          telefone: data.telefone || '', // Mapeia 'telefone' do backend para 'telefone' no estado
          data_nascimento: data.data_nascimento || '', // Mapeia 'data_nascimento'
          foto: data.foto || null,
          password: '********',
        });
        setPasswordInput('********');
      } catch (error: any) { // Tipagem 'any' para evitar erro 'unknown'
        console.error('Erro ao buscar dados do professor:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil do professor. ' + (error.response?.data?.message || 'Verifique sua conexão.'));
      } finally {
        setLoading(false);
      }
    };

    fetchProfessorData();
  }, []);

  // --- Função para atualizar dados do professor (PUT) ---
  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('professorToken');
    const id = await AsyncStorage.getItem('professorId');

    if (!token || !id) {
      Alert.alert('Erro', 'Sessão de professor expirada. Por favor, faça login novamente para atualizar.');
      return;
    }

    const updatePayload: Partial<ProfessorData> = {
      full_name: professor.full_name,
      telefone: formatPhone(professor.telefone || ''),
      data_nascimento: professor.data_nascimento, // Incluindo data_nascimento na atualização
      // Não incluímos email diretamente aqui se ele não for alterável
    };

    // Lógica para atualizar a senha
    if (passwordInput !== '********') {
      if (passwordInput.length >= 6) {
        updatePayload.password = passwordInput;
      } else {
        Alert.alert('Erro', 'A nova senha deve ter no mínimo 6 caracteres.');
        return;
      }
    }

    try {
      // Rota específica para professores
      const response = await axios.put(
        `${API_URL}/api/professores/${id}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Sucesso', response.data.message || 'Seus dados foram atualizados com sucesso!');
      setPasswordInput('********');
    } catch (error: any) { // Tipagem 'any' para evitar erro 'unknown'
      console.error('Erro ao atualizar dados do professor:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 'Não foi possível atualizar os dados. Tente novamente.';
      Alert.alert('Erro', errorMessage);
    }
  };

  // Função genérica para lidar com mudanças nos inputs
  const handleChange = (field: keyof ProfessorData, value: string) => {
    if (field === 'telefone') { // Mapeia 'telefone'
      setProfessor((prev) => ({ ...prev, [field]: formatPhone(value) }));
    } else {
      setProfessor((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Exibe um indicador de carregamento
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgScreen }}>
        <ActivityIndicator size="large" color={mainText} />
        <Text style={{ marginTop: 10, color: subText }}>Carregando perfil do professor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgScreen }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: cardBg,
              width: cardWidth,
              shadowColor: '#000',
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
              <Text style={[styles.name, { color: mainText }]}>{professor.full_name || 'Nome do Professor'}</Text>
              {/* Você pode adicionar a disciplina aqui, se seu backend retornar */}
              {/* Ex: <Text style={[styles.course, { color: subText }]}>{professor.disciplina || 'Disciplina não informada'}</Text> */}
              <Text style={[styles.course, { color: subText }]}>Professor</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={
                  professor.foto
                    ? { uri: professor.foto }
                    : require('./assets/professor.jpg') // Imagem estática para professor
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

          {/* Informações Institucionais (Matrícula e Validade não se aplicam a professor como ao aluno) */}
          {/* Você pode substituir esta seção por informações relevantes ao professor */}
          <View style={{ marginBottom: 5 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { color: label }]}>Data de Nascimento</Text>
              <Text style={[styles.value, { color: mainText }]}>{professor.data_nascimento || 'N/A'}</Text>
            </View>
            {/* Exemplo de outro campo específico do professor */}
            {/* <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { color: label }]}>Departamento</Text>
              <Text style={[styles.value, { color: mainText }]}>{professor.departamento || 'N/A'}</Text>
            </View> */}
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
                  {professor.email}
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
                  value={professor.telefone}
                  onChangeText={(text) => handleChange('telefone', text)}
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => { /* Lógica para habilitar edição ou focar no input */ }}>
                <Feather name="edit" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            {/* Data de Nascimento */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Data de Nascimento</Text>
                <TextInput
                  style={{ color: mainText, fontSize: 16, borderBottomWidth: 1, borderColor: divider, paddingBottom: 2 }}
                  value={professor.data_nascimento}
                  onChangeText={(text) => handleChange('data_nascimento', text)}
                  keyboardType="numeric" // Ou 'default' se for usar um date picker
                  placeholder="AAAA-MM-DD"
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
                  value={passwordInput}
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