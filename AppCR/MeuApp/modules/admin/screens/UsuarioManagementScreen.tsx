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
import { createProfessor, getAllProfessores, updateProfessor, deleteProfessor } from '../controllers/professorController';
import { createAluno, getAllAlunos, updateAluno, deleteAluno } from '../controllers/alunoController';
import { getAllTurmas } from '../controllers/turmaController'; 

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
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Usuários</Text>
          <Text style={styles.subtitle}>Administre {viewType === 'student' ? 'alunos' : 'professores'}</Text>
        </View>

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
            onPress={() => handleOpenModal()} 
            disabled={loading}
        />

        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={18} color="#94a3b8" />
          <TextInput placeholder="Pesquisar..." style={[styles.searchInput, { color: textColor }]} placeholderTextColor="#94a3b8" />
        </View>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) => {
            const tId = (item as any).turma_id || (item as any).turma_id_principal;
            const turmaNome = turmas.find(t => t.id === tId)?.nome || 'Sem Turma';
            return (
              <View style={[styles.userCard, { backgroundColor: cardBg }]}>
                <View style={styles.userInfo}>
                  <Text style={styles.userBadge}>{turmaNome}</Text>
                  <Text style={[styles.userName, { color: textColor }]}>{item.full_name}</Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenModal(item)}>
                    <Feather name="edit-2" size={18} color="#2563eb" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => item.id && handleDelete(item.id)}>
                    <Feather name="trash-2" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

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
              <View style={styles.inputGroup}>
                <Label required>Nome Completo</Label>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  value={formData.full_name} 
                  onChangeText={(v) => handleInputChange('full_name', v)} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Label required>Turma</Label>
                <View style={renderSelectContainer()}>
                  <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                    {turmas.map(t => (
                      <TouchableOpacity 
                        key={t.id} 
                        style={renderOptionStyle(formData.turma_id === t.id)}
                        onPress={() => handleInputChange('turma_id', t.id)}
                      >
                        <Text style={{ color: textColor }}>{t.nome}</Text>
                        {formData.turma_id === t.id && <Feather name="check-circle" size={16} color="#2563eb" />}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Label required>Data de Nascimento</Label>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  placeholder="DD/MM/AAAA"
                  keyboardType="numeric"
                  value={formData.birthDate} 
                  onChangeText={(v) => handleInputChange('birthDate', formatDate(v))} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Label>Telefone</Label>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  keyboardType="numeric"
                  value={formData.phone} 
                  onChangeText={(v) => handleInputChange('phone', formatPhone(v))} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Label required>Email</Label>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={formData.email} 
                  onChangeText={(v) => handleInputChange('email', v)} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Label required={!selectedUser}>Senha</Label>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                  secureTextEntry
                  placeholder={selectedUser ? "Deixar vazio para não alterar" : "Mínimo 6 caracteres"}
                  value={formData.password} 
                  onChangeText={(v) => handleInputChange('password', v)} 
                />
              </View>

              {isMinor && (
                <View style={{ borderTopWidth: 1, borderColor: '#e2e8f0', marginTop: 10, paddingTop: 10 }}>
                  <Text style={[styles.inputLabel, { color: '#2563eb', marginBottom: 10 }]}>Dados do Responsável</Text>
                  <Label required>Nome</Label>
                  <TextInput 
                    style={[styles.input, { backgroundColor: inputBg, color: textColor, marginBottom: 10 }]} 
                    value={formData.responsibleFullName}
                    onChangeText={(v) => handleInputChange('responsibleFullName', v)}
                  />
                  <Label required>Email</Label>
                  <TextInput 
                    style={[styles.input, { backgroundColor: inputBg, color: textColor }]} 
                    value={formData.responsibleEmail}
                    onChangeText={(v) => handleInputChange('responsibleEmail', v)}
                  />
                </View>
              )}

              <CustomButton title="Confirmar" onPress={handleSave} loading={loading} />
              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}