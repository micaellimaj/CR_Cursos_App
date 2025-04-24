import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Image, 
  Alert 
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import styles from './styles/ProfileScreenStyles'; // Importando os estilos

export default function ProfileScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  // Dados fictícios do usuário
  const [user, setUser] = useState({
    name: 'Matheus Feliciano',
    email: 'matheusfeliciano@email.com',
    phone: '(11) 98765-4321',
    birthDate: '1990-05-15',
    password: '********',
    course: 'Engenharia de Software',
    registrationId: '123456789',
    validity: '12/2025',
  });

  const handleEdit = (field: string) => {
    Alert.alert('Editar', `Você clicou para editar o campo: ${field}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('./assets/aluno.png')} // Substitua com a imagem do usuário
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
            </View>
<Text style={styles.name}>{user.name}</Text>
<Text style={styles.info}>{user.email}</Text>
<Text style={styles.info}>{user.phone}</Text>
<Text style={styles.userCourse}>Curso: {user.course}</Text>
</View>

        {/* Cartão com dados institucionais */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dados Institucionais</Text>
          <Text style={styles.cardContent}>Matrícula: {user.registrationId}</Text>
          <Text style={styles.cardContent}>Validade: {user.validity}</Text>
        </View>

        {/* Meus Dados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Dados</Text>
          {[
            { label: 'E-mail', value: user.email, field: 'email' },
            { label: 'Telefone', value: user.phone, field: 'phone' },
            { label: 'Data de Nascimento', value: user.birthDate, field: 'birthDate' },
            { label: 'Senha', value: user.password, field: 'password' },
          ].map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.label, { color: isLightTheme ? '#2e2f33' : '#e2e8f0' }]}>{item.label}:</Text>
              <Text style={[styles.value, { color: isLightTheme ? '#65676b' : '#cbd5e1' }]}>{item.value}</Text>
              <TouchableOpacity onPress={() => handleEdit(item.field)} style={styles.editButton}>
                <Feather name="edit-2" size={20} color={isLightTheme ? '#2563eb' : '#60a5fa'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.updateButton, { backgroundColor: isLightTheme ? '#2563eb' : '#60a5fa' }]}
            onPress={() => Alert.alert('Atualizado!', 'Seus dados foram atualizados com sucesso.')}
          >
            <Text style={styles.updateButtonText}>Atualizar Dados</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}