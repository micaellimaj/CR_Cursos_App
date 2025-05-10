import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/RegisterScreenStyles'; // Importando os estilos

const { width } = Dimensions.get('window');

//função pra deixar cpf bonito
const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, ''); // Remove tudo que não for número
  return cleaned
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    .slice(0, 14); //coloca o limite de números 
};

//função pra deixar telefone bonito
const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, ''); // Remove tudo que não for número
  return cleaned
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
    .slice(0, 15); //coloca o limite de números
};

//deixa a data de nascimento bonita
const formatDate = (value: string) => {
  const cleaned = value.replace(/\D/g, ''); // Remove tudo que não for número
  return cleaned
    .replace(/^(\d{2})(\d)/, '$1/$2')          // dd/
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3') // dd/mm/
    .slice(0, 10); // Limita a 10 caracteres no total
};

type UserType = 'student' | 'teacher';

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [userType, setUserType] = useState<UserType>('student');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    password: '',
    instagram: '',
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validação simples
    const requiredFields: (keyof typeof formData)[] = ['fullName', 'age', 'phone', 'email', 'password'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Exibe a mensagem de sucesso
    setSuccessMessage(true);

    // Limpa os campos do formulário após 3 segundos
    setTimeout(() => {
      setSuccessMessage(false);
      setFormData({
        fullName: '',
        age: '',
        phone: '',
        email: '',
        password: '',
        instagram: '',
      });

      // Redireciona para a tela de login
      navigation.navigate('Login');
    }, 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        {/* Mensagem de sucesso */}
        {successMessage && (
          <View style={styles.successMessage}>
            <FontAwesome5 name="check-circle" size={20} color="#fff" />
            <Text style={styles.successText}>Cadastro concluído com Sucesso!</Text>
          </View>
        )}

        {/* Logo com título */}
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { color: isLightTheme ? '#2e2f33' : '#e2e8f0' }]}>
            CR Cursos
          </Text>
          <Text style={[styles.subtitle, { color: isLightTheme ? '#65676b' : '#cbd5e1' }]}>
            Crie sua conta
          </Text>
        </View>

        {/* Formulário de cadastro */}
        <View style={styles.formContainer}>
          {/* Nome Completo */}
          <View style={styles.inputContainer}>
            <Feather name="user" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="Nome Completo"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
            />
          </View>

          {/* Data de Nascimento */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="calendar-today" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="Data de nascimento"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(value) => handleInputChange('age', formatDate(value))}
            />
          </View>

          {/* Telefone */}
          <View style={styles.inputContainer}>
            <Feather name="phone" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="Telefone"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              keyboardType="numeric"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', formatPhone(value))}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="Email"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
          </View>

          {/* Senha */}
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="Senha"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>

          {/* Botão de cadastro */}
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: isLightTheme ? '#42b72a' : '#16a34a' }]}
            onPress={handleSubmit}
          >
            <Text style={styles.loginButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}