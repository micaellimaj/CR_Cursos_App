import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/SubjectManagementStyles';
import { getAllCursos } from '../controllers/cursoController';
import { getAllProfessores } from '../controllers/professorController'
import { getAllTurmas } from '../controllers/turmaController';

// Importação dos Controllers e Types
import { 
  getAllDisciplinas, createDisciplina, updateDisciplina, 
  deleteDisciplina, associarTurmaDisciplina 
} from '../controllers/disciplinaController';
import { ICurso, IProfessor, IDisciplina, ITurma } from '../types';

export default function SubjectManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados
  const [subjects, setSubjects] = useState<IDisciplina[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [assocModalVisible, setAssocModalVisible] = useState(false);
  const [courses, setCourses] = useState<ICurso[]>([]);
  const [professors, setProfessors] = useState<IProfessor[]>([]);
  const [turmas, setTurmas] = useState<ITurma[]>([]);
  
  // Estados de Form
  const [selectedSubject, setSelectedSubject] = useState<IDisciplina | null>(null);
  const [formData, setFormData] = useState({ nome: '', cursoId: '', professorId: '' });
  const [assocData, setAssocData] = useState({ turmaId: '', professorId: '' });

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  useEffect(() => { 
    fetchDisciplinas(); 
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
  try {
    const [cursosData, profesData, turmasData] = await Promise.all([
      getAllCursos(),
      getAllProfessores(),
      getAllTurmas()
    ]);
    setCourses(Array.isArray(cursosData) ? cursosData : []);
    setProfessors(Array.isArray(profesData) ? profesData : []);
    setTurmas(Array.isArray(turmasData) ? turmasData : []);
  } catch (error) {
    console.error("Erro ao carregar dados auxiliares");
  }
};

  const fetchDisciplinas = async () => {
    try {
      setLoading(true);
      const data = await getAllDisciplinas();
      
      setSubjects(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error(error.message);
      Alert.alert("Erro", "Não foi possível carregar as disciplinas.");
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: IDisciplina) => {
    if (item) {
      setSelectedSubject(item);
      setFormData({ nome: item.nome, cursoId: item.cursoId, professorId: item.professorId });
    } else {
      setSelectedSubject(null);
      setFormData({ nome: '', cursoId: '', professorId: '' });
    }
    setModalVisible(true);
  };

  const handleOpenAssoc = (item: IDisciplina) => {
    setSelectedSubject(item);
    setAssocData({ turmaId: '', professorId: item.professorId });
    setAssocModalVisible(true);
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.cursoId || !formData.professorId) {
      Alert.alert("Erro", "Preencha os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      if (selectedSubject?.id) {
        await updateDisciplina(selectedSubject.id, formData);
        Alert.alert("Sucesso", "Disciplina atualizada!");
      } else {
        await createDisciplina(formData);
        Alert.alert("Sucesso", "Disciplina criada!");
      }
      setModalVisible(false);
      fetchDisciplinas();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAssoc = async () => {
    if (!selectedSubject?.id || !assocData.turmaId || !assocData.professorId) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await associarTurmaDisciplina({
        disciplinaId: selectedSubject.id,
        turmaId: assocData.turmaId,
        professorId: assocData.professorId
      });
      Alert.alert("Sucesso", "Turma vinculada à disciplina!");
      setAssocModalVisible(false);
    } catch (error: any) {
      Alert.alert("Erro na Associação", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta disciplina?", [
      { text: "Cancelar" },
      { text: "Excluir", style: "destructive", onPress: async () => {
        try {
          await deleteDisciplina(id);
          fetchDisciplinas();
        } catch (error: any) { Alert.alert("Erro", error.message); }
      }}
    ]);
  };

  // Funções Auxiliares de Estilização
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

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Disciplinas</Text>
          <Text style={styles.subtitle}>Crie e gerencie as matérias e seus vínculos</Text>
        </View>

        <CustomButton title="+ Nova Disciplina" onPress={() => handleOpenModal()} />

        {loading && <ActivityIndicator color="#2563eb" style={{ marginVertical: 10 }} />}

        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => {
            const cursoNome = courses.find(c => c.id === item.cursoId)?.nome || item.cursoId;
            return (
              <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="layers-outline" size={24} color="#2563eb" />
                </View>
                <View style={styles.subjectInfo}>
                  <View style={styles.subjectHeader}>
                    <Text style={[styles.subjectName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{item.nome}</Text>
                    <Text style={styles.subjectCode}>{item.id?.substring(0, 5)}</Text>
                  </View>
                  <Text style={styles.courseTag}><Ionicons name="book-outline" size={12}/> {cursoNome}</Text>
                  <Text style={styles.creditsTag}>{item.turmasAssociadas?.length || 0} turmas vinculadas</Text>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenAssoc(item)}>
                    <MaterialCommunityIcons name="link-plus" size={20} color="#10b981" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenModal(item)}>
                    <Feather name="edit-2" size={18} color="#2563eb" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => item.id && handleDelete(item.id)}>
                    <Feather name="trash-2" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* MODAL DE CRIAÇÃO/EDIÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                {selectedSubject ? 'Editar Disciplina' : 'Nova Disciplina'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={26} color={labelColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Nome da Disciplina</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  value={formData.nome}
                  onChangeText={t => setFormData({...formData, nome: t})}
                  placeholder="Ex: Cálculo I" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Curso Vinculado</Text>
                <View style={renderSelectContainer()}>
                  <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                    {courses.map(c => (
                      <TouchableOpacity 
                        key={c.id} 
                        style={renderOptionStyle(formData.cursoId === c.id)}
                        onPress={() => setFormData({...formData, cursoId: c.id || ''})}
                      >
                        <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{c.nome}</Text>
                        {formData.cursoId === c.id && <Ionicons name="checkmark-circle" size={18} color="#2563eb" />}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Professor Responsável</Text>
                <View style={renderSelectContainer()}>
                  <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                    {professors.map(p => (
                      <TouchableOpacity 
                        key={p.id} 
                        style={renderOptionStyle(formData.professorId === p.id)}
                        onPress={() => setFormData({...formData, professorId: p.id || ''})}
                      >
                        <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{p.full_name}</Text>
                        {formData.professorId === p.id && <Ionicons name="checkmark-circle" size={18} color="#2563eb" />}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                <Text style={styles.saveButtonText}>{loading ? 'Salvando...' : 'Confirmar'}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* MODAL ASSOCIAR TURMA */}
      <Modal visible={assocModalVisible} animationType="fade" transparent statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Vincular Turma</Text>
              <TouchableOpacity onPress={() => setAssocModalVisible(false)}>
                <MaterialIcons name="close" size={26} color={labelColor} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: labelColor }]}>Selecionar Turma</Text>
              <View style={renderSelectContainer()}>
                <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                  {turmas.map(t => (
                    <TouchableOpacity 
                      key={t.id} 
                      style={renderOptionStyle(assocData.turmaId === t.id)}
                      onPress={() => setAssocData({...assocData, turmaId: t.id || ''})}
                    >
                      <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{t.nome}</Text>
                      {assocData.turmaId === t.id && <Ionicons name="checkmark-circle" size={18} color="#10b981" />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: labelColor }]}>Professor Autorizador</Text>
              <View style={renderSelectContainer()}>
                <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
                  {professors.map(p => (
                    <TouchableOpacity 
                      key={p.id} 
                      style={renderOptionStyle(assocData.professorId === p.id)}
                      onPress={() => setAssocData({...assocData, professorId: p.id || ''})}
                    >
                      <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{p.full_name}</Text>
                      {assocData.professorId === p.id && <Ionicons name="checkmark-circle" size={18} color="#2563eb" />}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <CustomButton title="Vincular Agora" onPress={handleConfirmAssoc} loading={loading} />
          </View>
        </View>
      </Modal>
    </View>
  );
}