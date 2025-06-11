import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/RegisterScreenStyles';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

type FormFields = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  responsibleFullName: string;
  responsibleEmail: string;
  responsiblePhone: string;
};


// Função para calcular idade a partir da data de nascimento (formato dd/mm/yyyy)
function getAge(dateString: string) {
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year || year.length !== 4) return null;
  const today = new Date();
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState<FormFields>({
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

  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const {
      fullName,
      birthDate,
      phone,
      email,
      password,
      confirmPassword,
      responsibleFullName,
      responsibleEmail,
      responsiblePhone
    } = formData;

    const token = await AsyncStorage.getItem('token');

    const requiredFields: (keyof FormFields)[] = ['fullName', 'birthDate', 'phone', 'email', 'password', 'confirmPassword'];
  
    const emptyFields = requiredFields.filter((field) => formData[field].trim() === '');
    if (emptyFields.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Erro: As senhas não coincidem.');
      return;
    }
  
    // Calcular idade para saber se precisa do responsável
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
  
    const alunoPayload: any = {
      full_name: fullName,
      birth_date: birthDate,
      phone,
      email,
      password,
      user_type: userType, // Envia o tipo de usuário
    };
  
    // Se for menor de idade, exige dados do responsável
    if (age < 18) {
      if (!responsibleFullName || !responsibleEmail || !responsiblePhone) {
        alert('Por favor, preencha os dados do responsável.');
        return;
      }
  
      alunoPayload.responsible = {
        full_name: responsibleFullName,
        email: responsibleEmail,
        phone: responsiblePhone
      };
    }
  
    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/alunos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(alunoPayload),
      });
      
      if (response.ok) {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          setFormData({
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
          navigation.navigate('Login');
        }, 3000);
      } else {
        const error = await response.json();
        Alert.alert('Erro no cadastro', error.message || 'Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor.');
    }
  };
  
  const age = getAge(formData.birthDate);
  const isMinor = age !== null && age < 18 && age > 0; // Só libera se idade válida e menor de 18

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
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

          {/* Seletor de tipo de usuário com bolinhas */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}
              onPress={() => setUserType('student')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.radioOuter,
                  userType === 'student' && styles.radioOuterSelected,
                ]}
              >
                {userType === 'student' && <View style={styles.radioInner} />}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  { color: isLightTheme ? '#222' : '#e2e8f0' },
                  userType === 'student' && styles.radioLabelSelected,
                  userType === 'student' && { fontWeight: 'bold' }, // Negrito se selecionado
                ]}
              >
                Aluno
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setUserType('teacher')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.radioOuter,
                  userType === 'teacher' && styles.radioOuterSelected,
                ]}
              >
                {userType === 'teacher' && <View style={styles.radioInner} />}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  { color: isLightTheme ? '#222' : '#e2e8f0' },
                  userType === 'teacher' && styles.radioLabelSelected,
                  userType === 'teacher' && { fontWeight: 'bold' }, // Negrito se selecionado
                ]}
              >
                Professor
              </Text>
            </TouchableOpacity>
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
                value={formData.birthDate}
                onChangeText={(value) => handleInputChange('birthDate', formatDate(value))}
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

            {/* Confirmar Senha */}
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
                placeholder="Confirmar Senha"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
              />
            </View>

            {/* Campos do responsável (opcional) */}
        <Text style={{ marginTop: 20, fontWeight: 'bold', color: isLightTheme ? '#000' : '#fff', opacity: isMinor ? 1 : 0.5 }}>
          Dados do Responsável (caso menor de idade)
        </Text>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
          <TextInput
            style={[styles.input, {
              backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
              borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
              color: isLightTheme ? '#000' : '#fff',
              opacity: isMinor ? 1 : 0.5,
            }]}
            placeholder="Nome do Responsável"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={formData.responsibleFullName}
            onChangeText={(value) => handleInputChange('responsibleFullName', value)}
            editable={isMinor}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
          <TextInput
            style={[styles.input, {
              backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
              borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
              color: isLightTheme ? '#000' : '#fff',
              opacity: isMinor ? 1 : 0.5,
            }]}
            placeholder="Email do Responsável"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={formData.responsibleEmail}
            onChangeText={(value) => handleInputChange('responsibleEmail', value)}
            editable={isMinor}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
          <TextInput
            style={[styles.input, {
              backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
              borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
              color: isLightTheme ? '#000' : '#fff',
              opacity: isMinor ? 1 : 0.5,
            }]}
            placeholder="Telefone do Responsável"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={formData.responsiblePhone}
            onChangeText={(value) => handleInputChange('responsiblePhone', value)}
            editable={isMinor}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

