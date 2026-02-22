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
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/RegisterScreenStyles';

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

function getAge(dateString: string): number | null {
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;

  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

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

  const [userType, setUserType] = useState<UserType>('student');
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

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const { fullName, email, password } = formData;

    if (!fullName || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios.');
      return;
    }

    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      navigation.navigate('Login');
    }, 2000);
  };

  const age = getAge(formData.birthDate);
  const isMinorAndStudent = userType === 'student' && age !== null && age < 18 && age > 0;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
        <ActivityIndicator size="large" color={isLightTheme ? '#2563eb' : '#60a5fa'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          {successMessage && (
            <View style={styles.successMessage}>
              <FontAwesome5 name="check-circle" size={20} color="#fff" />
              <Text style={styles.successText}>Cadastro concluído com Sucesso!</Text>
            </View>
          )}

          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, { color: isLightTheme ? '#2e2f33' : '#e2e8f0' }]}>
              CR Cursos
            </Text>
            <Text style={[styles.subtitle, { color: isLightTheme ? '#65676b' : '#cbd5e1' }]}>
              Crie sua conta para o {userType === 'student' ? 'aluno' : 'professor'}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 30 }}
              onPress={() => setUserType('student')}
            >
              <View style={[styles.radioOuter, userType === 'student' && styles.radioOuterSelected]}>
                {userType === 'student' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.radioLabel, { color: isLightTheme ? '#222' : '#e2e8f0' }, userType === 'student' && styles.radioLabelSelected]}>
                Aluno
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setUserType('teacher')}
            >
              <View style={[styles.radioOuter, userType === 'teacher' && styles.radioOuterSelected]}>
                {userType === 'teacher' && <View style={styles.radioInner} />}
              </View>
              <Text style={[styles.radioLabel, { color: isLightTheme ? '#222' : '#e2e8f0' }, userType === 'teacher' && styles.radioLabelSelected]}>
                Professor
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
              <TextInput
                style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff' }]}
                placeholder="Nome Completo"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="calendar-today" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
              <TextInput
                style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff' }]}
                placeholder="Data de nascimento (DD/MM/AAAA)"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                keyboardType="numeric"
                value={formData.birthDate}
                onChangeText={(value) => handleInputChange('birthDate', formatDate(value))}
                maxLength={10}
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="phone" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
              <TextInput
                style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff' }]}
                placeholder="Telefone"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                keyboardType="numeric"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', formatPhone(value))}
                maxLength={15}
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="mail" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
              <TextInput
                style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff' }]}
                placeholder="Email"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="lock" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
              <TextInput
                style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff' }]}
                placeholder="Senha"
                placeholderTextColor={isLightTheme ? '#65676b' : '#9ca3af'}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
              />
            </View>

            {userType === 'student' && (
              <>
                <Text style={{ marginTop: 20, fontWeight: 'bold', color: isLightTheme ? '#000' : '#fff', opacity: isMinorAndStudent ? 1 : 0.5 }}>
                  Dados do Responsável (caso menor de idade)
                </Text>

                <View style={styles.inputContainer}>
                  <Feather name="user" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff', opacity: isMinorAndStudent ? 1 : 0.5 }]}
                    placeholder="Nome do Responsável"
                    value={formData.responsibleFullName}
                    onChangeText={(value) => handleInputChange('responsibleFullName', value)}
                    editable={isMinorAndStudent}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather name="mail" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff', opacity: isMinorAndStudent ? 1 : 0.5 }]}
                    placeholder="Email do Responsável"
                    value={formData.responsibleEmail}
                    onChangeText={(value) => handleInputChange('responsibleEmail', value)}
                    editable={isMinorAndStudent}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Feather name="phone" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} style={styles.icon} />
                  <TextInput
                    style={[styles.input, { backgroundColor: isLightTheme ? '#f5f6f7' : '#1e293b', borderColor: isLightTheme ? '#dddfe2' : '#4b5563', color: isLightTheme ? '#000' : '#fff', opacity: isMinorAndStudent ? 1 : 0.5 }]}
                    placeholder="Telefone do Responsável"
                    value={formData.responsiblePhone}
                    onChangeText={(value) => handleInputChange('responsiblePhone', formatPhone(value))}
                    editable={isMinorAndStudent}
                  />
                </View>
              </>
            )}

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