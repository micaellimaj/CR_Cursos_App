import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/UsuarioManagementStyles';

// Controllers
import { createProfessor, getAllProfessores, deleteProfessor } from '../controllers/professorController';
import { createAluno, getAllAlunos, deleteAluno } from '../controllers/alunoController';

// Types - Importando ambos
import { IAluno, IProfessor } from '../types';

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

export default function UsuarioManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [viewType, setViewType] = useState<'student' | 'teacher'>('student');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estado genérico para usuários (pode ser Aluno ou Professor)
  const [users, setUsers] = useState<(IAluno | IProfessor)[]>([]);

  const [formData, setFormData] = useState({
    full_name: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    turma_id: '', // Usado como turma_id (aluno) ou turma_id_principal (professor)
    responsibleFullName: '',
    responsibleEmail: '',
    responsiblePhone: '',
  });

  // Carregar dados sempre que a aba mudar ou ao iniciar
  useEffect(() => {
    fetchData();
  }, [viewType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (viewType === 'student') {
        const data = await getAllAlunos();
        setUsers(data);
      } else {
        const data = await getAllProfessores();
        setUsers(data);
      }
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const age = getAge(formData.birthDate);
    
    // Validação básica para professor
    if (viewType === 'teacher' && age !== null && age < 18) {
      Alert.alert("Erro", "O professor deve ser maior de idade.");
      return;
    }

    try {
      setLoading(true);
      
      if (viewType === 'student') {
        const payload: IAluno = {
          full_name: formData.full_name,
          email: formData.email,
          senha: formData.password,
          data_nascimento: formData.birthDate,
          turma_id: formData.turma_id,
          telefone: formData.phone,
          nome_responsavel: isMinor ? formData.responsibleFullName : undefined,
          email_responsavel: isMinor ? formData.responsibleEmail : undefined,
          telefone_responsavel: isMinor ? formData.responsiblePhone : undefined,
        };
        await createAluno(payload);
      } else {
        const payload: IProfessor = {
          full_name: formData.full_name,
          email: formData.email,
          senha: formData.password,
          data_nascimento: formData.birthDate,
          turma_id_principal: formData.turma_id, // Mapeado para o campo do professor
          telefone: formData.phone,
        };
        await createProfessor(payload);
      }

      Alert.alert("Sucesso", `${viewType === 'student' ? 'Aluno' : 'Professor'} cadastrado com sucesso!`);
      setModalVisible(false);
      fetchData();
      resetForm();
    } catch (error: any) {
      Alert.alert("Erro ao cadastrar", error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '', birthDate: '', phone: '', email: '', password: '',
      turma_id: '', responsibleFullName: '', responsibleEmail: '', responsiblePhone: '',
    });
  };

  const handleDelete = (id: string) => {
    const label = viewType === 'student' ? 'aluno' : 'professor';
    Alert.alert("Excluir", `Deseja realmente remover este ${label}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
        try {
          if (viewType === 'student') {
            await deleteAluno(id);
          } else {
            await deleteProfessor(id);
          }
          fetchData();
        } catch (error: any) {
          Alert.alert("Erro", error.message);
        }
      }}
    ]);
  };

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

        <CustomButton 
            title={loading ? "Carregando..." : `+ Novo ${viewType === 'student' ? 'Aluno' : 'Professor'}`} 
            onPress={() => setModalVisible(true)} 
            disabled={loading}
        />

        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={18} color="#94a3b8" />
          <TextInput placeholder="Pesquisar..." style={[styles.searchInput, { color: textColor }]} placeholderTextColor="#94a3b8" />
        </View>

        {loading && <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />}

        <FlatList
          data={users}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={[styles.userCard, { backgroundColor: cardBg }]}>
              <View style={styles.userInfo}>
                <Text style={styles.userBadge}>
                    {(item as IAluno).turma_id || (item as IProfessor).turma_id_principal || 'S/T'}
                </Text>
                <Text style={[styles.userName, { color: textColor }]}>{item.full_name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => item.id && handleDelete(item.id)}>
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true} statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                Novo {viewType === 'student' ? 'Aluno' : 'Professor'}
              </Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome Completo</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  value={formData.full_name} 
                  onChangeText={(v) => handleInputChange('full_name', v)} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ID da Turma {viewType === 'teacher' && '(Principal)'}</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  value={formData.turma_id} 
                  onChangeText={(v) => handleInputChange('turma_id', v)} 
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
                  <TextInput 
                    placeholder="Nome do Responsável"
                    style={[styles.input, { backgroundColor: inputBg, color: textColor, marginBottom: 10 }]} 
                    value={formData.responsibleFullName}
                    onChangeText={(v) => handleInputChange('responsibleFullName', v)}
                  />
                  <TextInput 
                    placeholder="Email do Responsável"
                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                    value={formData.responsibleEmail}
                    onChangeText={(v) => handleInputChange('responsibleEmail', v)}
                  />
                </View>
              )}

              <CustomButton 
                title="Confirmar Cadastro"
                onPress={handleSave}
                loading={loading}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}