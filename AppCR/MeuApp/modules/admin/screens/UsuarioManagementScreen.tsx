import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, SafeAreaView 
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/UsuarioManagementStyles';

// Máscaras mantidas para o backend
const formatPhone = (v: string) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2').slice(0, 15);
const formatDate = (v: string) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3').slice(0, 10);

function getAge(dateString: string): number | null {
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  const birthDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
  return age;
}

export default function RegisterScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [viewType, setViewType] = useState<'student' | 'teacher'>('student');
  const [modalVisible, setModalVisible] = useState(false);
  
  const [users, setUsers] = useState([
    { id: '1', fullName: 'Micael Silva', email: 'micael@edu.com', type: 'student', code: 'AL-001' },
    { id: '2', fullName: 'Prof. Sarah Johnson', email: 'sarah.j@edu.com', type: 'teacher', code: 'PR-102' },
  ]);

  const [formData, setFormData] = useState({
    fullName: '', birthDate: '', phone: '', email: '', password: '',
    responsibleFullName: '', responsibleEmail: '', responsiblePhone: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const age = getAge(formData.birthDate);
  const isMinor = viewType === 'student' && age !== null && age < 18 && age > 0;
  
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const textColor = isLightTheme ? '#1e293b' : '#fff';
  const inputBg = isLightTheme ? '#f8fafc' : '#0f172a';

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Usuários</Text>
          <Text style={styles.subtitle}>Administre {viewType === 'student' ? 'alunos' : 'professores'}</Text>
        </View>

        {/* Tab Selector */}
        <View style={[styles.tabContainer, { backgroundColor: isLightTheme ? '#e2e8f0' : '#1e293b' }]}>
          <TouchableOpacity 
            style={[styles.tabButton, viewType === 'student' && styles.tabButtonActive]} 
            onPress={() => setViewType('student')}
          >
            <Text style={[styles.tabText, viewType === 'student' && styles.tabTextActive]}>Alunos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, viewType === 'teacher' && styles.tabButtonActive]} 
            onPress={() => setViewType('teacher')}
          >
            <Text style={[styles.tabText, viewType === 'teacher' && styles.tabTextActive]}>Professores</Text>
          </TouchableOpacity>
        </View>

        <CustomButton title={`+ Novo ${viewType === 'student' ? 'Aluno' : 'Professor'}`} onPress={() => setModalVisible(true)} />

        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={18} color="#94a3b8" />
          <TextInput placeholder="Pesquisar..." style={[styles.searchInput, { color: textColor }]} placeholderTextColor="#94a3b8" />
        </View>

        <FlatList
          data={users.filter(u => u.type === viewType)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.userCard, { backgroundColor: cardBg }]}>
              <View style={styles.userInfo}>
                <Text style={styles.userBadge}>{item.code}</Text>
                <Text style={[styles.userName, { color: textColor }]}>{item.fullName}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* MODAL PADRÃO "NOVO CURSO" */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                Novo {viewType === 'student' ? 'Aluno' : 'Professor'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Completo</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  value={formData.fullName} 
                  onChangeText={(v) => handleInputChange('fullName', v)} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Data de Nascimento</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  placeholder="DD/MM/AAAA"
                  keyboardType="numeric"
                  value={formData.birthDate} 
                  onChangeText={(v) => handleInputChange('birthDate', formatDate(v))} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  keyboardType="numeric"
                  value={formData.phone} 
                  onChangeText={(v) => handleInputChange('phone', formatPhone(v))} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={formData.email} 
                  onChangeText={(v) => handleInputChange('email', v)} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Senha</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  secureTextEntry
                  value={formData.password} 
                  onChangeText={(v) => handleInputChange('password', v)} 
                />
              </View>

              {isMinor && (
                <View style={{ borderTopWidth: 1, borderColor: '#e2e8f0', marginTop: 10, paddingTop: 10 }}>
                  <Text style={[styles.inputLabel, { color: '#2563eb' }]}>Dados do Responsável</Text>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nome do Responsável</Text>
                    <TextInput 
                      style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                      value={formData.responsibleFullName}
                      onChangeText={(v) => handleInputChange('responsibleFullName', v)}
                    />
                  </View>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Telefone do Responsável</Text>
                    <TextInput 
                      style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                      keyboardType="numeric"
                      value={formData.responsiblePhone}
                      onChangeText={(v) => handleInputChange('responsiblePhone', formatPhone(v))}
                    />
                  </View>
                </View>
              )}

              <TouchableOpacity 
                style={[styles.saveButton, { backgroundColor: isLightTheme ? '#1e3a8a' : '#2563eb' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Confirmar Cadastro</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}