import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/ProfileScreenStyles';
import { API_URL } from '@env';
// import logoImage from './assets/images/aluno.png';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [user, setUser] = useState({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    responsibleFullName: '',
    responsibleEmail: '',
    responsiblePhone: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

      try {
        const response = await axios.get(`${API_URL}/api/alunos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setUser({
          fullName: data.full_name || '',
          birthDate: data.data_nascimento || '',
          phone: data.telefone || '',
          email: data.email || '',
          password: '********',
          confirmPassword: '********',
          responsibleFullName: data.responsavel_nome || '',
          responsibleEmail: data.responsavel_email || '',
          responsiblePhone: data.responsavel_telefone || '',
        });
      } catch (error) {
        console.error('Erro ao buscar dados do aluno:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do aluno.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');

    try {
      await axios.put(`${API_URL}/api/alunos/${id}`, {
        full_name: user.fullName,
        data_nascimento: user.birthDate,
        telefone: user.phone,
        email: user.email,
        responsavel_nome: user.responsibleFullName,
        responsavel_email: user.responsibleEmail,
        responsavel_telefone: user.responsiblePhone,
        // Envie a senha se o campo for alterado
        ...(user.password !== '********' && { password: user.password }),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/*
        <Image
          source={logoImage}
          style={styles.avatar}
        />
*/}
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.info}>{user.email}</Text>
          <Text style={styles.info}>{user.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Dados</Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={user.fullName}
            onChangeText={(text) => handleChange('fullName', text)}
          />

          <Text style={styles.label}>Data de nascimento</Text>
          <TextInput
            style={styles.input}
            value={user.birthDate}
            onChangeText={(text) => handleChange('birthDate', text)}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => handleChange('email', text)}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={user.password}
            onChangeText={(text) => handleChange('password', text)}
          />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={user.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Responsável</Text>

          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={user.responsibleFullName}
            onChangeText={(text) => handleChange('responsibleFullName', text)}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={user.responsibleEmail}
            onChangeText={(text) => handleChange('responsibleEmail', text)}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={user.responsiblePhone}
            onChangeText={(text) => handleChange('responsiblePhone', text)}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: isLightTheme ? '#2563eb' : '#60a5fa' }]}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>Atualizar Dados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
