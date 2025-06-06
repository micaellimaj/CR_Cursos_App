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

  const [user, setUser] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    matricula: '',
    validade: '',
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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' },
      ]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text
              style={[
                styles.name,
                { color: isLightTheme ? '#2563eb' : '#60a5fa' },
              ]}
            >
              {user.fullName}
            </Text>
            <Text
              style={[
                styles.course,
                { color: isLightTheme ? '#2563eb' : '#60a5fa' },
              ]}
            >
              Curso: Engenharia de Software
            </Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={require('./assets/aluno.png')} // Substitua pelo caminho correto da imagem
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Dados Institucionais */}
        <View style={styles.institutionalBlock}>
          <Text style={styles.sectionTitle}>Dados Institucionais</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Matrícula:</Text>
            <Text style={styles.value}>{user.matricula}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Validade:</Text>
            <Text style={styles.value}>{user.validade}</Text>
          </View>
        </View>

        {/* Meus Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Dados</Text>

          {/* Nome */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={user.fullName}
                onChangeText={(text) => handleChange('fullName', text)}
              />
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="edit" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Telefone */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Telefone:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={user.phone}
                onChangeText={(text) => handleChange('phone', text)}
              />
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="edit" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.email}>{user.email}</Text>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="copy" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Senha */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={user.password}
                onChangeText={(text) => handleChange('password', text)}
              />
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="edit" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
