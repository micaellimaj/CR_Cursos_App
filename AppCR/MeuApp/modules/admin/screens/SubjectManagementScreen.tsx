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

// Importação dos Controllers e Types
import { 
  getAllDisciplinas, createDisciplina, updateDisciplina, 
  deleteDisciplina, associarTurmaDisciplina 
} from '../controllers/disciplinaController';
import { IDisciplina } from '../types';

export default function SubjectManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados
  const [subjects, setSubjects] = useState<IDisciplina[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [assocModalVisible, setAssocModalVisible] = useState(false);
  
  // Estados de Form
  const [selectedSubject, setSelectedSubject] = useState<IDisciplina | null>(null);
  const [formData, setFormData] = useState({ nome: '', cursoId: '', professorId: '' });
  const [assocData, setAssocData] = useState({ turmaId: '', professorId: '' });

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  useEffect(() => { fetchDisciplinas(); }, []);

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
          renderItem={({ item }) => (
            <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.iconContainer}>
                <Ionicons name="layers-outline" size={24} color="#2563eb" />
              </View>
              <View style={styles.subjectInfo}>
                <View style={styles.subjectHeader}>
                  <Text style={[styles.subjectName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{item.nome}</Text>
                  <Text style={styles.subjectCode}>{item.id?.substring(0, 5)}</Text>
                </View>
                <Text style={styles.courseTag}><Ionicons name="book-outline" size={12}/> {item.cursoId}</Text>
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
          )}
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
                <Text style={[styles.inputLabel, { color: labelColor }]}>ID do Curso Vinculado</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  value={formData.cursoId}
                  onChangeText={t => setFormData({...formData, cursoId: t})}
                  placeholder="Cole o ID do curso aqui" 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>ID do Professor Responsável</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                  value={formData.professorId}
                  onChangeText={t => setFormData({...formData, professorId: t})}
                  placeholder="ID do Professor" 
                />
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
              <Text style={[styles.inputLabel, { color: labelColor }]}>ID da Turma</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                placeholder="Ex: TURMA_ADS_2024"
                value={assocData.turmaId}
                onChangeText={t => setAssocData({...assocData, turmaId: t})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: labelColor }]}>ID do Professor Autorizador</Text>
              <TextInput 
                style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
                placeholder="ID do Professor"
                value={assocData.professorId}
                onChangeText={t => setAssocData({...assocData, professorId: t})}
              />
            </View>

            <CustomButton title="Vincular Agora" onPress={handleConfirmAssoc} loading={loading} />
          </View>
        </View>
      </Modal>
    </View>
  );
}