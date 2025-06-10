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
  responsibleFullName: string;
  responsibleEmail: string;
  responsiblePhone: string;
};


// Função para calcular idade a partir da data de nascimento (formato dd/mm/yyyy)
function getAge(dateString: string): number | null { // Adicionei o tipo de retorno para clareza
  const parts = dateString.split('/');
  // Verifica se há 3 partes e se todas podem ser convertidas para número
  if (parts.length !== 3 || !/^\d+$/.test(parts[0]) || !/^\d+$/.test(parts[1]) || !/^\d+$/.test(parts[2])) {
    console.warn("Formato de data inválido para cálculo de idade:", dateString);
    return null; // Retorna null se o formato não for DD/MM/AAAA
  }

  const day = Number(parts[0]);
  const month = Number(parts[1]); // Mês sem subtrair 1 aqui
  const year = Number(parts[2]);

  // Validação de valores numéricos para data
  if (isNaN(day) || isNaN(month) || isNaN(year) || year.toString().length !== 4) {
    console.warn("Valores numéricos inválidos na data de nascimento:", dateString);
    return null;
  }

  const today = new Date();
  // No construtor de Date, o mês é base 0 (janeiro é 0, fevereiro é 1, etc.)
  // Por isso, precisamos subtrair 1 do mês que vem em formato DD/MM/AAAA.
  const birthDate = new Date(year, month - 1, day);

  // Verificação adicional para datas inválidas (ex: 31/02/2000)
  if (birthDate.getFullYear() !== year || birthDate.getMonth() !== (month - 1) || birthDate.getDate() !== day) {
    console.warn("Data de nascimento inválida (e.g., dia ou mês inexistente):", dateString);
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Verifica se a idade calculada é um número válido antes de retornar
  return isNaN(age) ? null : age;
}

export default function RegisterScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  // O userType aqui é para a seleção no formulário (aluno/professor),
  // mas para cadastro de ALUNO por admin, o payload deve ser sempre 'aluno'.
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
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

  const [isAdmin, setIsAdmin] = useState(false); // Estado para controlar se o usuário é admin
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento inicial

// ---
  // Lógica de Verificação de Admin ao Carregar a Tela
  // ---
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        const storedToken = await AsyncStorage.getItem('userToken'); // Adicione este log
        console.log('Token lido no RegisterScreen (useEffect):', storedToken); // Adicione este log
        console.log('Tipo de usuário lido no RegisterScreen (useEffect):', storedUserType); // Adicione este log
        if (storedUserType === 'admin') {
          setIsAdmin(true);
        } else {
          Alert.alert('Acesso Negado', 'Somente administradores podem cadastrar alunos.');
          navigation.goBack(); // Redireciona de volta se não for admin
        }
      } catch (error) {
        console.error('Erro ao verificar status de admin:', error);
        Alert.alert('Erro', 'Não foi possível verificar suas permissões.');
        navigation.goBack();
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    checkAdminStatus();
  }, [navigation]); // Dependência em 'navigation' para garantir que roda quando a tela é focada.

  const [successMessage, setSuccessMessage] = useState(false); // Estado para mensagem de sucesso

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

   const handleSubmit = async () => {
    // Verifica novamente se o usuário é admin antes de prosseguir com a submissão
    if (!isAdmin) {
      Alert.alert('Permissão', 'Você não tem permissão para cadastrar alunos.');
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

    const token = await AsyncStorage.getItem('userToken');
    console.log('Token lido no RegisterScreen (handleSubmit):', token);
    if (!token) {
      Alert.alert('Erro de Autenticação', 'Você precisa estar logado para cadastrar alunos.');
      navigation.navigate('Login'); // Redireciona para o login
      return;
    }

    const requiredFields: (keyof FormFields)[] = ['fullName', 'birthDate', 'phone', 'email', 'password'];
  
    const emptyFields = requiredFields.filter((field) => !formData[field] || formData[field].trim() === '');
    if (emptyFields.length > 0) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }
  
    // Calcular idade para saber se precisa do responsável
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
  
    const alunoPayload: any = {
      full_name: fullName,           // OK: full_name
      data_nascimento: birthDate,    // OK: data_nascimento
      telefone: phone,               // OK: telefone
      email,                  // OK: email
      senha: password,               // OK: senha
    };
  
    // Se for menor de idade, exige dados do responsável
    if (age !== null && age < 18 && age > 0) { // Garanta que a idade é menor de 18 e válida (>0)
  if (!responsibleFullName || !responsibleEmail || !responsiblePhone) {
    Alert.alert('Erro', 'Por favor, preencha os dados do responsável para menores de idade.'); // Melhorar a mensagem
    return;
  }
  
      // Adiciona os campos do responsável diretamente ao objeto alunoPayload
  alunoPayload.nome_responsavel = responsibleFullName;
  alunoPayload.email_responsavel = responsibleEmail;
  alunoPayload.telefone_responsavel = responsiblePhone;
  } else {
      // Se não for menor de idade, ou se a idade for inválida (<=0), garanta que os campos de responsável não sejam enviados ou sejam null
      // Isso é importante para evitar que dados de responsável sejam salvos para adultos
      alunoPayload.nome_responsavel = null;
      alunoPayload.email_responsavel = null;
      alunoPayload.telefone_responsavel = null;
  }

console.log('Payload enviado para o backend:', alunoPayload); // Log do payload final
console.log('Idade calculada (handleSubmit):', age);
console.log('É menor de idade? (handleSubmit):', isMinor);


  
    try {
      const response = await fetch(`${API_URL}/api/alunos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(alunoPayload),
      });

      // --- LOG ADICIONADO AQUI ---
    console.log('Status da resposta:', response.status);
    const responseText = await response.text(); // Lê a resposta como texto
    console.log('Corpo da resposta (RAW):', responseText);
    // --- FIM DO LOG ---
      
      if (response.ok) {
        let responseData = {};
        try {
            if (responseText) { // Tenta parsear JSON apenas se houver texto
                responseData = JSON.parse(responseText);
            }
        } catch (parseError) {
            console.error('Erro ao fazer parse do JSON de sucesso:', parseError);
            Alert.alert('Sucesso (mas aviso)', 'Aluno cadastrado com sucesso, mas houve um problema ao processar a resposta do servidor.');
            // Ainda pode continuar, já que a operação foi bem-sucedida (response.ok)
        }

        Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
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
      } else { // Status 4xx, 5xx
    // Tenta parsear JSON de erro
    let errorData = { message: 'Erro desconhecido.' };
    try {
        if (responseText) {
            errorData = JSON.parse(responseText);
        } else {
            errorData.message = `Erro do servidor: ${response.status}`;
        }
    } catch (parseError) {
        console.error('Erro ao fazer parse do JSON de erro ou resposta não é JSON:', parseError);
        errorData.message = responseText || `Erro do servidor: ${response.status}`; // Usa o texto bruto ou status
    }
    Alert.alert('Erro no cadastro', errorData.message);
    console.error('Erro na resposta do servidor:', response.status, errorData);
  }
    } catch (error) {
      Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      console.error('Erro na requisição de cadastro:', error);
    }
  };

  const age = getAge(formData.birthDate);
  const isMinor = age !== null && age < 18 && age > 0; // Só libera se idade válida e menor de 18

  // ---
  // Renderização Condicional
  // ---

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
              Crie sua conta para o aluno ou professor
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

