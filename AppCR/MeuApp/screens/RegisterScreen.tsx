import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/RegisterScreenStyles';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Funções de formatação de entrada (CPF, Telefone, Data)
const formatCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    .slice(0, 14);
};

const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
    .slice(0, 15);
};

const formatDate = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10);
};

type UserType = 'student' | 'teacher';

// Interface para os campos do formulário (agora mais genérica para aluno/professor)
type FormFields = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  // Campos do responsável, que serão usados condicionalmente
  responsibleFullName: string;
  responsibleEmail: string;
  responsiblePhone: string;
};

// Função para calcular idade a partir da data de nascimento (formato dd/mm/yyyy)
function getAge(dateString: string): number | null {
  const parts = dateString.split('/');
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
    console.warn("Formato de data inválido para cálculo de idade:", dateString);
    return null;
  }

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  if (isNaN(day) || isNaN(month) || isNaN(year) || year.toString().length !== 4) {
    console.warn("Valores numéricos inválidos na data de nascimento:", dateString);
    return null;
  }

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  if (birthDate.getFullYear() !== year || birthDate.getMonth() !== (month - 1) || birthDate.getDate() !== day) {
    console.warn("Data de nascimento inválida (e.g., dia ou mês inexistente):", dateString);
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return isNaN(age) ? null : age;
}

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [userType, setUserType] = useState<UserType>('student'); // 'student' é o padrão inicial
  const [formData, setFormData] = useState<FormFields>({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    responsibleFullName: '',
    responsibleEmail: '',
    responsiblePhone: '',
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        console.log('Tipo de usuário lido no RegisterScreen (useEffect):', storedUserType);
        if (storedUserType === 'admin') {
          setIsAdmin(true);
        } else {
          Alert.alert('Acesso Negado', 'Somente administradores podem cadastrar novos usuários (alunos ou professores).');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao verificar status de admin:', error);
        Alert.alert('Erro', 'Não foi possível verificar suas permissões.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigation]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!isAdmin) {
      Alert.alert('Permissão', 'Você não tem permissão para cadastrar usuários.');
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    console.log('Token lido no RegisterScreen (handleSubmit):', token);
    if (!token) {
      Alert.alert('Erro de Autenticação', 'Você precisa estar logado para cadastrar usuários.');
      navigation.navigate('Login');
      return;
    }

    const {
      fullName,
      birthDate,
      phone,
      email,
      password,
      responsibleFullName,
      responsibleEmail,
      responsiblePhone
    } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    // Calcular idade
    const age = getAge(birthDate);
    console.log('Idade calculada (handleSubmit):', age);
    if (age === null || isNaN(age)) { // Validação da idade
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato DD/MM/AAAA.');
      return;
    }

    // --- Determina o payload e o endpoint com base no userType ---
    let payload: any = {
      full_name: fullName,
      data_nascimento: birthDate,
      telefone: phone,
      email,
      senha: password,
    };
    let endpoint = '';
    let successMessageTitle = '';
    let successMessageBody = '';
    let errorMessageTitle = '';
    let errorMessageBody = '';

    if (userType === 'student') {
      endpoint = `${API_URL}/alunos`;
      successMessageTitle = 'Sucesso';
      successMessageBody = 'Aluno cadastrado com sucesso!';
      errorMessageTitle = 'Erro no cadastro do aluno';
      errorMessageBody = 'Erro interno do servidor ao cadastrar aluno.';

      // Lógica de responsável apenas para aluno menor de idade
      const isMinorStudent = age < 18;
      console.log('É menor de idade (Aluno)?', isMinorStudent);

      if (isMinorStudent) {
        if (!responsibleFullName || !responsibleEmail || !responsiblePhone) {
          Alert.alert('Erro', 'Por favor, preencha os dados do responsável para alunos menores de idade.');
          return;
        }
        payload.nome_responsavel = responsibleFullName;
        payload.email_responsavel = responsibleEmail;
        payload.telefone_responsavel = responsiblePhone;
      } else {
        // Garante que campos de responsável não são enviados para alunos maiores de idade
        payload.nome_responsavel = null;
        payload.email_responsavel = null;
        payload.telefone_responsavel = null;
      }

      // Validação de campos obrigatórios para Aluno
      const requiredStudentFields: (keyof FormFields)[] = ['fullName', 'birthDate', 'phone', 'email', 'password'];
      const emptyStudentFields = requiredStudentFields.filter((field) => !formData[field] || formData[field].trim() === '');
      if (emptyStudentFields.length > 0) {
        Alert.alert('Erro', `Por favor, preencha todos os campos obrigatórios para o aluno: ${emptyStudentFields.join(', ')}.`);
        return;
      }

    } else if (userType === 'teacher') {
      endpoint = `${API_URL}/professores`;
      successMessageTitle = 'Sucesso';
      successMessageBody = 'Professor cadastrado com sucesso!';
      errorMessageTitle = 'Erro no cadastro do professor';
      errorMessageBody = 'Erro interno do servidor ao cadastrar professor.';

      // Professores não têm campo de responsável, então garantimos que não vão no payload
      payload.nome_responsavel = undefined; // Undefined para não enviar
      payload.email_responsavel = undefined;
      payload.telefone_responsavel = undefined;

      // Validação de campos obrigatórios para Professor (os mesmos que Aluno por enquanto)
      const requiredTeacherFields: (keyof FormFields)[] = ['fullName', 'birthDate', 'phone', 'email', 'password'];
      const emptyTeacherFields = requiredTeacherFields.filter((field) => !formData[field] || formData[field].trim() === '');
      if (emptyTeacherFields.length > 0) {
        Alert.alert('Erro', `Por favor, preencha todos os campos obrigatórios para o professor: ${emptyTeacherFields.join(', ')}.`);
        return;
      }
    }

    console.log('Payload enviado para o backend:', payload);
    console.log('Endpoint:', endpoint);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('Status da resposta:', response.status);
      const responseText = await response.text();
      console.log('Corpo da resposta (RAW):', responseText);

      if (response.ok) {
        let responseData = {};
        try {
          if (responseText) {
            responseData = JSON.parse(responseText);
          }
        } catch (parseError) {
          console.error('Erro ao fazer parse do JSON de sucesso:', parseError);
          Alert.alert(successMessageTitle + ' (mas aviso)', successMessageBody + ' Houve um problema ao processar a resposta do servidor.');
        }

        Alert.alert(successMessageTitle, successMessageBody);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          // Limpa o formulário e volta para o Login
          setFormData({
            fullName: '',
            birthDate: '',
            phone: '',
            email: '',
            password: '',
            responsibleFullName: '',
            responsibleEmail: '',
            responsiblePhone: '',
          });
          navigation.navigate('Login');
        }, 3000);
      } else {
        let errorData = { message: errorMessageBody };
        try {
          if (responseText) {
            errorData = JSON.parse(responseText);
          } else {
            errorData.message = `Erro do servidor: ${response.status}`;
          }
        } catch (parseError) {
          console.error('Erro ao fazer parse do JSON de erro ou resposta não é JSON:', parseError);
          errorData.message = responseText || `Erro do servidor: ${response.status}`;
        }
        Alert.alert(errorMessageTitle, errorData.message);
        console.error('Erro na resposta do servidor:', response.status, errorData);
      }
    } catch (error) {
      Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      console.error('Erro na requisição de cadastro:', error);
    }
  };

  const age = getAge(formData.birthDate);
  // Apenas alunos podem ter responsáveis, então 'isMinor' só é relevante se userType for 'student'
  const isMinorAndStudent = userType === 'student' && age !== null && age < 18 && age > 0;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
        <ActivityIndicator size="large" color={isLightTheme ? '#2563eb' : '#60a5fa'} />
        <Text style={{ marginTop: 10, color: isLightTheme ? '#000' : '#fff' }}>Verificando permissões...</Text>
      </View>
    );
  }

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
              Crie sua conta para o {userType === 'student' ? 'aluno' : 'professor'}
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
                  userType === 'student' && { fontWeight: 'bold' },
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
                  userType === 'teacher' && { fontWeight: 'bold' },
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
                placeholder="Data de nascimento (DD/MM/AAAA)"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                keyboardType="numeric"
                value={formData.birthDate}
                onChangeText={(value) => handleInputChange('birthDate', formatDate(value))}
                maxLength={10} // Limita a 10 caracteres
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
                maxLength={15} // Limita a 15 caracteres
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
                keyboardType="email-address" // Sugere teclado de email
                autoCapitalize="none" // Desabilita capitalização automática
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

            {/* Campos do responsável - SÓ APARECEM SE FOR ALUNO E MENOR DE IDADE */}
            {userType === 'student' && (
              <>
                <Text
                  style={{
                    marginTop: 20,
                    fontWeight: 'bold',
                    color: isLightTheme ? '#000' : '#fff',
                    opacity: isMinorAndStudent ? 1 : 0.5, // Opacidade para indicar se é editável
                  }}
                >
                  Dados do Responsável (caso menor de idade)
                </Text>

                <View style={styles.inputContainer}>
                  <Feather name="user" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                        borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                        color: isLightTheme ? '#000' : '#fff',
                        opacity: isMinorAndStudent ? 1 : 0.5,
                      },
                    ]}
                    placeholder="Nome do Responsável"
                    placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                    value={formData.responsibleFullName}
                    onChangeText={(value) => handleInputChange('responsibleFullName', value)}
                    editable={isMinorAndStudent} // Habilita/Desabilita edição
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather name="mail" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                        borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                        color: isLightTheme ? '#000' : '#fff',
                        opacity: isMinorAndStudent ? 1 : 0.5,
                      },
                    ]}
                    placeholder="Email do Responsável"
                    placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                    value={formData.responsibleEmail}
                    onChangeText={(value) => handleInputChange('responsibleEmail', value)}
                    editable={isMinorAndStudent}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather name="phone" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                        borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                        color: isLightTheme ? '#000' : '#fff',
                        opacity: isMinorAndStudent ? 1 : 0.5,
                      },
                    ]}
                    placeholder="Telefone do Responsável"
                    placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                    value={formData.responsiblePhone}
                    onChangeText={(value) => handleInputChange('responsiblePhone', formatPhone(value))}
                    editable={isMinorAndStudent}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            {/* Botão de cadastro */}
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: isLightTheme ? '#42b72a' : '#16a34a' }]}
              onPress={handleSubmit}
            >
              <Text style={styles.loginButtonText}>Cadastrar {userType === 'student' ? 'Aluno' : 'Professor'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}