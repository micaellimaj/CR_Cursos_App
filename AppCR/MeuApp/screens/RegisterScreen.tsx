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
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

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
    address: '',
    email: '',
    password: '',
    instagram: '',
    cpf: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validação simples
    const requiredFields: (keyof typeof formData)[] = ['fullName', 'age', 'phone', 'address', 'email', 'password'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
     

    alert('Cadastro realizado com sucesso!');

    setFormData({
      fullName: '',
      age: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      instagram: '',
      cpf: '',
    });

      // Só redireciona se o cadastro foi bem-sucedido
      navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
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

          {userType === 'student' && (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                  borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                  color: isLightTheme ? '#000' : '#fff',
                },
              ]}
              placeholder="CPF"
              placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
              keyboardType='numeric'
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', formatCPF(value))}
            />
          )}

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
            keyboardType='numeric'
            value={formData.age}
            onChangeText={(value) => handleInputChange('age', formatDate(value))}
          />

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
            keyboardType='numeric'
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', formatPhone(value))}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b',
                borderColor: isLightTheme ? '#dddfe2' : '#4b5563',
                color: isLightTheme ? '#000' : '#fff',
              },
            ]}
            placeholder="Endereço"
            placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});