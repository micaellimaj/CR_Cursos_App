import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/ClassManagementStyles';

// Importação dos Controllers
import { 
  getAllTurmas, createTurma, updateTurma, deleteTurma, 
  matricularAluno, associarProfessorTurma 
} from '../controllers/turmaController';
import { getAllCursos } from '../controllers/cursoController';
import { getAllAlunos } from '../controllers/alunoController';
import { getAllProfessores } from '../controllers/professorController';
import { ITurma, IAluno, IProfessor, ICurso } from '../types';

export default function ClassManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados de Dados
  const [classes, setClasses] = useState<ITurma[]>([]);
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [alunos, setAlunos] = useState<IAluno[]>([]);
  const [professores, setProfessores] = useState<IProfessor[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modais
  const [modalVisible, setModalVisible] = useState(false);
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [teacherModalVisible, setTeacherModalVisible] = useState(false);

  // Estados de Form
  const [selectedClass, setSelectedClass] = useState<ITurma | null>(null);
  const [formData, setFormData] = useState({ nome: '', curso_id: '', data_inicio: '', data_fim: '' });
  const [targetId, setTargetId] = useState(''); 

  // Estilos Dinâmicos
  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';
  const textColor = isLightTheme ? '#000' : '#fff';

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [turmasData, cursosData, alunosData, profsData] = await Promise.all([
        getAllTurmas(),
        getAllCursos(),
        getAllAlunos(),
        getAllProfessores()
      ]);
      setClasses(turmasData);
      setCursos(cursosData);
      setAlunos(alunosData);
      setProfessores(profsData);
    } catch (error) {
      Alert.alert("Erro", "Erro ao carregar dados do servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMainModal = (item?: ITurma) => {
    if (item) {
      setSelectedClass(item);
      setFormData({ 
        nome: item.nome, 
        curso_id: item.curso_id, 
        data_inicio: item.data_inicio, 
        data_fim: item.data_fim 
      });
    } else {
      setSelectedClass(null);
      setFormData({ nome: '', curso_id: '', data_inicio: '', data_fim: '' });
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!formData.curso_id) return Alert.alert("Erro", "Selecione um curso.");
    try {
      setLoading(true);
      if (selectedClass?.id) {
        await updateTurma(selectedClass.id, formData);
        Alert.alert("Sucesso", "Turma atualizada!");
      } else {
        await createTurma(formData as any);
        Alert.alert("Sucesso", "Turma criada!");
      }
      setModalVisible(false);
      fetchInitialData();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleAction = async (type: 'enroll' | 'teacher') => {
    if (!selectedClass?.id || !targetId) return Alert.alert("Erro", "Selecione um usuário.");
    try {
      setLoading(true);
      if (type === 'enroll') {
        await matricularAluno(selectedClass.id, targetId);
        Alert.alert("Sucesso", "Aluno matriculado!");
        setEnrollModalVisible(false);
      } else {
        await associarProfessorTurma(selectedClass.id, targetId);
        Alert.alert("Sucesso", "Professor associado!");
        setTeacherModalVisible(false);
      }
      setTargetId('');
      fetchInitialData();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta turma?", [
      { text: "Cancelar" },
      { text: "Sim", style: 'destructive', onPress: async () => {
        await deleteTurma(id);
        fetchInitialData();
      }}
    ]);
  };

  // Helper para renderizar lista de seleção dentro dos modais
  const RenderSelector = ({ data, selectedValue, onSelect, labelKey = 'full_name' }: any) => (
    <View style={{ maxHeight: 200, backgroundColor: inputBg, borderRadius: 8, marginVertical: 10, borderWidth: 1, borderColor: '#e2e8f0' }}>
      <ScrollView nestedScrollEnabled>
        {data.map((item: any) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => onSelect(item.id)}
            style={{ 
              padding: 12, 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              backgroundColor: selectedValue === item.id ? (isLightTheme ? '#eff6ff' : '#2d3748') : 'transparent',
              borderBottomWidth: 1,
              borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155'
            }}
          >
            <Text style={{ color: textColor }}>{item[labelKey] || item.nome}</Text>
            {selectedValue === item.id && <Feather name="check-circle" size={16} color="#2563eb" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Turmas</Text>
          <Text style={styles.subtitle}>Gerencie cursos, matrículas e professores</Text>
        </View>

        <CustomButton title="+ Nova Turma" onPress={() => handleOpenMainModal()} />

        {loading && <ActivityIndicator color="#2563eb" style={{ marginVertical: 10 }} />}

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={[styles.classCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.classHeader}>
                <View style={styles.iconContainer}><FontAwesome5 name="users" size={18} color="#2563eb" /></View>
                <View style={styles.classMainInfo}>
                  <Text style={[styles.className, { color: textColor }]}>{item.nome}</Text>
                  <Text style={styles.classSubDetails}>
                    Curso: {cursos.find(c => c.id === item.curso_id)?.nome || 'Não encontrado'}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => handleOpenMainModal(item)}>
                    <Feather name="edit-2" size={18} color="#2563eb" style={{ marginRight: 15 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => item.id && handleDelete(item.id)}>
                    <Feather name="trash-2" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.manageButtons}>
                <TouchableOpacity style={styles.actionTextButton} onPress={() => { setSelectedClass(item); setEnrollModalVisible(true); }}>
                  <Ionicons name="person-add-outline" size={14} color={textColor} />
                  <Text style={[styles.actionText, {color: textColor}]}>Matricular</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionTextButton} onPress={() => { setSelectedClass(item); setTeacherModalVisible(true); }}>
                  <Ionicons name="git-network-outline" size={14} color={textColor} />
                  <Text style={[styles.actionText, {color: textColor}]}>Professor</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* MODAL: CRIAR / EDITAR TURMA */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior="padding" style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                {selectedClass ? 'Editar Turma' : 'Nova Turma'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={26} color={labelColor} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
              <Text style={{ color: labelColor, marginBottom: 5 }}>Nome da Turma</Text>
              <TextInput value={formData.nome} onChangeText={t => setFormData({...formData, nome: t})} style={[styles.input, { backgroundColor: inputBg, color: textColor }]} />
              
              <Text style={{ color: labelColor, marginTop: 10 }}>Selecionar Curso</Text>
              <RenderSelector 
                data={cursos} 
                selectedValue={formData.curso_id} 
                onSelect={(id: string) => setFormData({...formData, curso_id: id})} 
                labelKey="nome"
              />

              <TextInput placeholder="Data Início (AAAA-MM-DD)" value={formData.data_inicio} onChangeText={t => setFormData({...formData, data_inicio: t})} style={[styles.input, { backgroundColor: inputBg, color: textColor }]} />
              <TextInput placeholder="Data Fim (AAAA-MM-DD)" value={formData.data_fim} onChangeText={t => setFormData({...formData, data_fim: t})} style={[styles.input, { backgroundColor: inputBg, color: textColor }]} />
              <CustomButton title="Salvar Turma" onPress={handleSave} loading={loading} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* MODAL: MATRICULAR ALUNO */}
      <Modal visible={enrollModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff', marginBottom: 15 }]}>Matricular Aluno</Text>
            <RenderSelector 
                data={alunos} 
                selectedValue={targetId} 
                onSelect={setTargetId} 
                labelKey="full_name"
            />
            <CustomButton title="Confirmar Matrícula" onPress={() => handleAction('enroll')} loading={loading} />
            <TouchableOpacity onPress={() => { setEnrollModalVisible(false); setTargetId(''); }} style={{ marginTop: 15 }}>
              <Text style={{ color: '#ef4444', textAlign: 'center' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: ASSOCIAR PROFESSOR */}
      <Modal visible={teacherModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            <Text style={[styles.title, { fontSize: 18, color: isLightTheme ? '#1e3a8a' : '#fff', marginBottom: 15 }]}>Associar Professor</Text>
            <RenderSelector 
                data={professores} 
                selectedValue={targetId} 
                onSelect={setTargetId} 
                labelKey="full_name"
            />
            <CustomButton title="Vincular Professor" onPress={() => handleAction('teacher')} loading={loading} />
            <TouchableOpacity onPress={() => { setTeacherModalVisible(false); setTargetId(''); }} style={{ marginTop: 15 }}>
              <Text style={{ color: '#ef4444', textAlign: 'center' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}