import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/profileexampleStyles';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const [user, setUser] = useState({
    fullName: 'João da Silva',
    birthDate: '2005-08-15',
    phone: '(81) 91234-5678',
    email: 'joao.silva@example.com',
    password: '********',
    confirmPassword: '********',
    responsibleFullName: 'Maria da Silva',
    responsibleEmail: 'maria.silva@example.com',
    responsiblePhone: '(81) 99876-5432',
  });

  const handleUpdate = () => {
    // Aqui poderia ter uma requisição futura, mas por enquanto é só alerta
    Alert.alert('Sucesso', 'Dados atualizados localmente.');
  };

  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <ScrollView
      style={styles.content}
      contentContainerStyle={styles.contentContainer}
    >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
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
