import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/UsuarioManagementStyles';
import { createProfessor, getAllProfessores, updateProfessor, deleteProfessor } from '../controllers/professorController';
import { createAluno, getAllAlunos, updateAluno, deleteAluno } from '../controllers/alunoController';
import { getAllTurmas } from '../controllers/turmaController'; 
import { IAluno, IProfessor } from '../types';
import { DataSelector } from '../components/DataSelector';
import { FormInput } from '../components/FormInput';
import { UserCard } from '../components/UserCard';

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

  // --- ESTADOS ---
  const [viewType, setViewType] = useState<'student' | 'teacher'>('student');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<(IAluno | IProfessor)[]>([]);
  const [turmas, setTurmas] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<IAluno | IProfessor | null>(null);

  const [formData, setFormData] = useState({
    full_name: '', birthDate: '', phone: '', email: '', password: '',
    turma_id: '', responsibleFullName: '', responsibleEmail: '', responsiblePhone: '',
  });

  // --- DEFINIÇÃO DE CORES (Para evitar erro de "not found") ---
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const textColor = isLightTheme ? '#1e293b' : '#fff';
  const inputBg = isLightTheme ? '#f8fafc' : '#0f172a';
  const labelColor = isLightTheme ? '#64748b' : '#94a3b8';

  // --- CARREGAMENTO DE DADOS ---
  useEffect(() => {
    fetchData();
    const loadTurmas = async () => {
      try {
        const data = await getAllTurmas();
        setTurmas(data);
      } catch (e) { console.error("Erro turmas"); }
    };
    loadTurmas();
  }, [viewType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = viewType === 'student' ? await getAllAlunos() : await getAllProfessores();
      setUsers(data);
    } catch (error: any) {
      console.error("Erro dados:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---
  const handleOpenModal = (user?: IAluno | IProfessor) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        full_name: user.full_name,
        birthDate: user.data_nascimento,
        phone: user.telefone || '',
        email: user.email,
        password: '',
        turma_id: (user as any).turma_id || (user as any).turma_id_principal || '',
        responsibleFullName: (user as IAluno).nome_responsavel || '',
        responsibleEmail: (user as IAluno).email_responsavel || '',
        responsiblePhone: (user as IAluno).telefone_responsavel || '',
      });
    } else {
      resetForm();
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    const age = getAge(formData.birthDate);
    if (viewType === 'teacher' && age !== null && age < 18) {
      Alert.alert("Erro", "O professor deve ser maior de idade.");
      return;
    }

    try {
      setLoading(true);
      const isUpdate = !!selectedUser?.id;

      if (viewType === 'student') {
        const payload: IAluno = {
          full_name: formData.full_name,
          email: formData.email,
          senha: formData.password || undefined,
          data_nascimento: formData.birthDate,
          turma_id: formData.turma_id,
          telefone: formData.phone,
          nome_responsavel: isMinor ? formData.responsibleFullName : undefined,
          email_responsavel: isMinor ? formData.responsibleEmail : undefined,
          telefone_responsavel: isMinor ? formData.responsiblePhone : undefined,
        };
        isUpdate ? await updateAluno(selectedUser!.id!, payload) : await createAluno(payload);
      } else {
        const payload: IProfessor = {
          full_name: formData.full_name,
          email: formData.email,
          senha: formData.password || undefined,
          data_nascimento: formData.birthDate,
          turma_id_principal: formData.turma_id,
          telefone: formData.phone,
        };
        isUpdate ? await updateProfessor(selectedUser!.id!, payload) : await createProfessor(payload);
      }

      Alert.alert("Sucesso", `Usuário ${isUpdate ? 'atualizado' : 'cadastrado'}!`);
      setModalVisible(false);
      fetchData();
      resetForm();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFormData({
      full_name: '', birthDate: '', phone: '', email: '', password: '',
      turma_id: '', responsibleFullName: '', responsibleEmail: '', responsiblePhone: '',
    });
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover este usuário?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
        try {
          viewType === 'student' ? await deleteAluno(id) : await deleteProfessor(id);
          fetchData();
        } catch (error: any) { Alert.alert("Erro", error.message); }
      }}
    ]);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- HELPERS DE INTERFACE ---
  const Label = ({ children, required = false }: { children: string, required?: boolean }) => (
    <Text style={styles.inputLabel}>
      {children} {required ? <Text style={{ color: '#ef4444' }}>*</Text> : <Text style={{ fontSize: 10, fontWeight: 'normal', color: '#94a3b8' }}>(Opcional)</Text>}
    </Text>
  );

  const renderSelectContainer = () => ({
    backgroundColor: inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isLightTheme ? '#e2e8f0' : '#334155',
    overflow: 'hidden' as const,
  });

  const renderOptionStyle = (isSelected: boolean) => ({
    padding: 12,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: isSelected ? (isLightTheme ? '#eff6ff' : '#1e293b') : 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155',
  });

  const age = getAge(formData.birthDate);
  const isMinor = viewType === 'student' && age !== null && age < 18 && age > 0;

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Ionicons 
              name="person-add-outline" 
              size={24} 
              color={isLightTheme ? '#1e3a8a' : '#fff'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Gestão de Usuários
            </Text>
          </View>
          <Text style={styles.subtitle}>
            Administre {viewType === 'student' ? 'alunos' : 'professores'}
          </Text>
        </View>

        {/* TABS */}
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

        {/* BOTÃO NOVO */}
        <View style={styles.createButtonContainer}>
          <CustomButton 
              title={loading ? "Carregando..." : `+ Novo ${viewType === 'student' ? 'Aluno' : 'Professor'}`} 
              onPress={() => handleOpenModal()} 
              disabled={loading}
          />
        </View>

        {/* BUSCA */}
        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={18} color="#94a3b8" />
          <TextInput 
            placeholder="Pesquisar..." 
            style={[styles.searchInput, { color: textColor }]} 
            placeholderTextColor="#94a3b8" 
          />
        </View>

        {/* LISTA */}
        {loading ? (
          <ActivityIndicator color="#2563eb" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id || Math.random().toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <UserCard 
                item={item}
                textColor={textColor}
                cardBg={cardBg}
                turmaNome={turmas.find(t => t.id === ((item as any).turma_id || (item as any).turma_id_principal))?.nome || 'Sem Turma'}
                onEdit={() => handleOpenModal(item)}
                onDelete={() => item.id && handleDelete(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                {selectedUser ? 'Editar' : 'Novo'} {viewType === 'student' ? 'Aluno' : 'Professor'}
              </Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); resetForm(); }}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
              <FormInput 
                label="Nome Completo" required value={formData.full_name}
                onChangeText={(v) => handleInputChange('full_name', v)}
                inputBg={inputBg} textColor={textColor}
              />

              <DataSelector 
                label="Turma Principal" data={turmas} selectedId={formData.turma_id}
                onSelect={(id) => handleInputChange('turma_id', id)}
                displayField="nome" isLightTheme={isLightTheme}
                labelColor={labelColor} inputBg={inputBg}
              />

              <FormInput 
                label="Data de Nascimento" required value={formData.birthDate}
                placeholder="DD/MM/AAAA" keyboardType="numeric"
                onChangeText={(v) => handleInputChange('birthDate', formatDate(v))}
                inputBg={inputBg} textColor={textColor}
              />

              <FormInput 
                label="Telefone" value={formData.phone} keyboardType="numeric"
                onChangeText={(v) => handleInputChange('phone', formatPhone(v))}
                inputBg={inputBg} textColor={textColor}
              />

              <FormInput 
                label="Email" required value={formData.email}
                autoCapitalize="none" keyboardType="email-address"
                onChangeText={(v) => handleInputChange('email', v)}
                inputBg={inputBg} textColor={textColor}
              />

              <FormInput 
                label="Senha" required={!selectedUser} value={formData.password}
                secureTextEntry placeholder={selectedUser ? "Vazio para manter" : "Mínimo 6 caracteres"}
                onChangeText={(v) => handleInputChange('password', v)}
                inputBg={inputBg} textColor={textColor}
              />

              {isMinor && (
                <View style={{ borderTopWidth: 1, borderColor: isLightTheme ? '#e2e8f0' : '#334155', marginTop: 10, paddingTop: 10 }}>
                  <Text style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 15 }}>Dados do Responsável</Text>
                  
                  <FormInput 
                    label="Nome do Responsável" required value={formData.responsibleFullName}
                    onChangeText={(v) => handleInputChange('responsibleFullName', v)}
                    inputBg={inputBg} textColor={textColor}
                  />
                  <FormInput 
                    label="Email do Responsável" required value={formData.responsibleEmail}
                    keyboardType="email-address" autoCapitalize="none"
                    onChangeText={(v) => handleInputChange('responsibleEmail', v)}
                    inputBg={inputBg} textColor={textColor}
                  />
                  <FormInput 
                    label="Telefone do Responsável" required value={formData.responsiblePhone}
                    keyboardType="numeric"
                    onChangeText={(v) => handleInputChange('responsiblePhone', formatPhone(v))}
                    inputBg={inputBg} textColor={textColor}
                  />
                </View>
              )}

              <CustomButton title="Confirmar" onPress={handleSave} loading={loading} />
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}