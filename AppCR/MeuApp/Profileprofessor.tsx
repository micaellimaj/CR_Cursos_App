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
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/ProfilealunoStyles';
import { API_URL } from '@env';

interface ProfessorData {
  full_name: string;
  email: string;
  telefone?: string;
  data_nascimento?: string;
  foto?: string | null;
  password?: string;
}

export default function ProfileprofessorScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const { width } = useWindowDimensions();

  const colors = {
    cardBg: isLightTheme ? '#fff' : '#23272f',
    divider: isLightTheme ? '#e1e1e1' : '#334155',
    mainText: isLightTheme ? '#2563eb' : '#fff',
    subText: isLightTheme ? '#555' : '#cbd5e1',
    label: isLightTheme ? '#2563eb' : '#60a5fa',
    iconColor: isLightTheme ? '#2563eb' : '#60a5fa',
    bgScreen: isLightTheme ? '#f5f7fa' : '#181a20',
  };

  const cardWidth = width > 440 ? 400 : width * 0.92;
  const avatarSize = width > 400 ? 60 : width * 0.14;

  const [professor, setProfessor] = useState<ProfessorData>({
    full_name: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    foto: null,
  });

  const [passwordInput, setPasswordInput] = useState('********');
  const [loading, setLoading] = useState(true);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    }
    return cleaned.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2').slice(0, 15);
  };

  useEffect(() => {
    fetchProfessorData();
  }, []);

  const fetchProfessorData = async () => {
    try {
      const token = await AsyncStorage.getItem('professorToken');
      const id = await AsyncStorage.getItem('professorId');

      if (!token || !id) throw new Error('Sessão expirada');

      const { data } = await axios.get(`${API_URL}/professores/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfessor({
        full_name: data.full_name || '',
        email: data.email || '',
        telefone: data.telefone || '',
        data_nascimento: data.data_nascimento || '',
        foto: data.foto || null,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do professor.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('professorToken');
      const id = await AsyncStorage.getItem('professorId');

      const updatePayload: Partial<ProfessorData> = {
        full_name: professor.full_name,
        telefone: professor.telefone,
        data_nascimento: professor.data_nascimento,
      };

      if (passwordInput !== '********') {
        if (passwordInput.length < 6) return Alert.alert('Erro', 'Senha muito curta.');
        updatePayload.password = passwordInput;
      }

      const response = await axios.put(`${API_URL}/professores/${id}`, updatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sucesso', response.data.message || 'Dados atualizados!');
      setPasswordInput('********');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar dados.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgScreen }}>
        <ActivityIndicator size="large" color={colors.mainText} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgScreen }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, width: cardWidth, marginTop: 32, padding: 20, borderRadius: 10 }]}>
          
          <View style={[styles.header, { marginBottom: 15 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.mainText }]}>{professor.full_name || 'Professor'}</Text>
              <Text style={[styles.course, { color: colors.subText }]}>Corpo Docente</Text>
            </View>
            <Image
              source={professor.foto ? { uri: professor.foto } : require('./assets/professor.jpg')}
              style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, borderWidth: 2, borderColor: colors.mainText }}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.label, { color: colors.label }]}>Data de Nascimento</Text>
            <Text style={[styles.value, { color: colors.mainText }]}>{professor.data_nascimento || 'N/A'}</Text>
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.mainText, marginVertical: 10 }}>Meus dados</Text>

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Email</Text>
              <Text style={{ color: colors.mainText, fontSize: 16 }}>{professor.email}</Text>
            </View>
            <Feather name="copy" size={20} color={colors.iconColor} />
          </View>

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Telefone</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={professor.telefone}
                onChangeText={(t) => setProfessor({ ...professor, telefone: formatPhone(t) })}
                keyboardType="phone-pad"
              />
            </View>
            <Feather name="edit" size={20} color={colors.iconColor} />
          </View>

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Senha</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                secureTextEntry
                value={passwordInput}
                onChangeText={setPasswordInput}
              />
            </View>
            <Feather name="edit" size={20} color={colors.iconColor} />
          </View>

          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: colors.mainText, marginTop: 20 }]}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>Atualizar Dados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}