import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, SafeAreaView
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/SubjectManagementStyles';

// Componentes Refatorados
import { DataSelector } from '../components/DataSelector';
import { FormInput } from '../components/FormInput';
import { SubjectCard } from '../components/SubjectCard';

// Controllers
import { getAllCursos } from '../controllers/cursoController';
import { getAllProfessores } from '../controllers/professorController';
import { getAllTurmas } from '../controllers/turmaController';
import { 
  getAllDisciplinas, createDisciplina, updateDisciplina, 
  deleteDisciplina, associarTurmaDisciplina 
} from '../controllers/disciplinaController';

// Types
import { ICurso, IProfessor, IDisciplina, ITurma } from '../types';

export default function SubjectManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados de Dados
  const [subjects, setSubjects] = useState<IDisciplina[]>([]);
  const [courses, setCourses] = useState<ICurso[]>([]);
  const [professors, setProfessors] = useState<IProfessor[]>([]);
  const [turmas, setTurmas] = useState<ITurma[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados de Modais
  const [modalVisible, setModalVisible] = useState(false);
  const [assocModalVisible, setAssocModalVisible] = useState(false);
  
  // Estados de Form
  const [selectedSubject, setSelectedSubject] = useState<IDisciplina | null>(null);
  const [formData, setFormData] = useState({ nome: '', cursoId: '', professorId: '' });
  const [assocData, setAssocData] = useState({ turmaId: '', professorId: '' });

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const textColor = isLightTheme ? '#1e293b' : '#fff';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  useEffect(() => { 
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [subs, curs, profs, turs] = await Promise.all([
        getAllDisciplinas(),
        getAllCursos(),
        getAllProfessores(),
        getAllTurmas()
      ]);
      setSubjects(Array.isArray(subs) ? subs : []);
      setCourses(Array.isArray(curs) ? curs : []);
      setProfessors(Array.isArray(profs) ? profs : []);
      setTurmas(Array.isArray(turs) ? turs : []);
    } catch (error) {
      console.error("Erro ao carregar dados");
      Alert.alert("Erro", "Falha ao sincronizar dados com o servidor.");
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
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
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
      const updated = await getAllDisciplinas();
      setSubjects(updated);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAssoc = async () => {
    if (!selectedSubject?.id || !assocData.turmaId || !assocData.professorId) {
      Alert.alert("Erro", "Selecione a turma e o professor.");
      return;
    }
    try {
      setLoading(true);
      await associarTurmaDisciplina({
        disciplinaId: selectedSubject.id,
        turmaId: assocData.turmaId,
        professorId: assocData.professorId
      });
      Alert.alert("Sucesso", "Associação realizada!");
      setAssocModalVisible(false);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja apagar esta disciplina?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
          await deleteDisciplina(id);
          const updated = await getAllDisciplinas();
          setSubjects(updated);
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* HEADER QUE ESTAVA FALTANDO */}
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <MaterialCommunityIcons 
              name="book-open-variant" 
              size={26} 
              color={isLightTheme ? '#1e3a8a' : '#fff'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Disciplinas
            </Text>
          </View>
          <Text style={styles.subtitle}>Gerencie o currículo escolar</Text>
        </View>

        <View style={styles.createButtonContainer}>
          <CustomButton 
            title="+ Nova Disciplina" 
            onPress={() => handleOpenModal()} 
          />
        </View>

        {loading && <ActivityIndicator color="#2563eb" style={{ marginBottom: 10 }} />}

        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SubjectCard 
              item={item}
              isLightTheme={isLightTheme}
              cursoNome={courses.find(c => c.id === item.cursoId)?.nome || 'Sem curso'}
              onAssoc={() => handleOpenAssoc(item)}
              onEdit={() => handleOpenModal(item)}
              onDelete={() => item.id && handleDelete(item.id)}
            />
          )}
          ListEmptyComponent={
            !loading ? <Text style={{ textAlign: 'center', marginTop: 20, color: labelColor }}>Nenhuma disciplina cadastrada.</Text> : null
          }
        />
      </View>

      {/* MODAL DE CADASTRO */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
                {selectedSubject ? 'Editar' : 'Nova'} Disciplina
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <FormInput 
                label="Nome da Disciplina" required value={formData.nome}
                onChangeText={t => setFormData({...formData, nome: t})}
                inputBg={inputBg} textColor={textColor}
              />

              <DataSelector 
                label="Curso Vinculado" data={courses} selectedId={formData.cursoId}
                onSelect={(id) => setFormData({...formData, cursoId: id})}
                displayField="nome" isLightTheme={isLightTheme}
                labelColor={labelColor} inputBg={inputBg}
              />

              <DataSelector 
                label="Professor Titular" data={professors} selectedId={formData.professorId}
                onSelect={(id) => setFormData({...formData, professorId: id})}
                displayField="full_name" isLightTheme={isLightTheme}
                labelColor={labelColor} inputBg={inputBg}
              />

              <CustomButton title="Salvar Disciplina" onPress={handleSave} loading={loading} />
              <View style={{ height: 30 }} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* MODAL ASSOCIAÇÃO */}
      <Modal visible={assocModalVisible} animationType="fade" transparent statusBarTranslucent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>Vincular Turma</Text>
              <TouchableOpacity onPress={() => setAssocModalVisible(false)}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>

            <DataSelector 
              label="Selecione a Turma" data={turmas} selectedId={assocData.turmaId}
              onSelect={(id) => setAssocData({...assocData, turmaId: id})}
              displayField="nome" isLightTheme={isLightTheme}
              labelColor={labelColor} inputBg={inputBg}
            />

            <DataSelector 
              label="Professor p/ esta Turma" data={professors} selectedId={assocData.professorId}
              onSelect={(id) => setAssocData({...assocData, professorId: id})}
              displayField="full_name" isLightTheme={isLightTheme}
              labelColor={labelColor} inputBg={inputBg}
            />

            <CustomButton title="Finalizar Vínculo" onPress={handleConfirmAssoc} loading={loading} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}