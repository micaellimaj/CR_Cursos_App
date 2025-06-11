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
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/ProfilealunoStyles';
import { API_URL } from '@env';

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
    password: '',
    matricula: '',
    validade: '',
    foto: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

      if (!token || !id) return;

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
      } catch (error) {
        console.error('Erro ao buscar dados do aluno:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');

    try {
      await axios.put(
        `${API_URL}/api/alunos/${id}`,
        {
          full_name: user.fullName,
          telefone: user.phone,
          ...(user.password !== '********' && { password: user.password }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Sucesso', 'Seus dados foram atualizados.');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

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
              <Text style={[styles.name, { color: mainText }]}>{user.fullName}</Text>
              <Text style={[styles.course, { color: mainText }]}>Engenharia de Software</Text>
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
              <Text style={[styles.value, { color: mainText }]}>{user.matricula}</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.label, { color: label }]}>Validade</Text>
              <Text style={[styles.value, { color: mainText }]}>{user.validade}</Text>
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
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <Feather name="copy" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            {/* Telefone */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Telefone</Text>
                <Text style={{ color: mainText, fontSize: 16 }}>
                  {user.phone}
                </Text>
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }}>
                <Feather name="edit" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
            {/* Senha */}
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: subText, fontSize: 14, marginBottom: 2 }}>Senha</Text>
                <Text style={{ color: mainText, fontSize: 16 }}>
                  ********
                </Text>
              </View>
              <TouchableOpacity style={{ marginLeft: 8 }}>
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
