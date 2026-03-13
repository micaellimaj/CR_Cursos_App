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
import { DataSelector } from '../components/DataSelector';
import { ClassCard } from '../components/ClassCard';

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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <FontAwesome5 name="users" size={20} color={isLightTheme ? '#1e3a8a' : '#fff'} style={{ marginRight: 10 }} />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Turmas</Text>
          </View>
          <Text style={styles.subtitle}>Gerencie cursos, matrículas e professores</Text>
        </View>

        <View style={styles.createButtonContainer}>
          <CustomButton title="+ Nova Turma" onPress={() => handleOpenMainModal()} />
        </View>

        {loading && <ActivityIndicator color="#2563eb" style={{ marginVertical: 10 }} />}

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id || Math.random().toString()}
          renderItem={({ item }) => (
            <ClassCard 
              item={item}
              isLightTheme={isLightTheme}
              textColor={textColor}
              courseName={cursos.find(c => c.id === item.curso_id)?.nome || 'Não encontrado'}
              onEdit={() => handleOpenMainModal(item)}
              onDelete={() => item.id && handleDelete(item.id)}
              onEnroll={() => { setSelectedClass(item); setEnrollModalVisible(true); }}
              onSetTeacher={() => { setSelectedClass(item); setTeacherModalVisible(true); }}
            />
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
              <DataSelector 
                data={cursos} 
                selectedValue={formData.curso_id} 
                onSelect={(id) => setFormData({...formData, curso_id: id})} 
                labelKey="nome"
                inputBg={inputBg}
                textColor={textColor}
                isLightTheme={isLightTheme}
              />

              <View style={{ marginTop: 10 }}>
                <Text style={{ color: labelColor, marginBottom: 5 }}>Data de Início</Text>
                <TextInput placeholder="AAAA-MM-DD" value={formData.data_inicio} onChangeText={t => setFormData({...formData, data_inicio: t})} style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" />
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ color: labelColor, marginBottom: 5 }}>Data de Término</Text>
                <TextInput placeholder="AAAA-MM-DD" value={formData.data_fim} onChangeText={t => setFormData({...formData, data_fim: t})} style={[styles.input, { backgroundColor: inputBg, color: textColor }]} keyboardType="numeric" />
              </View>

              <View style={{ height: 25 }} />
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
            <DataSelector 
                data={alunos} 
                selectedValue={targetId} 
                onSelect={setTargetId} 
                inputBg={inputBg}
                textColor={textColor}
                isLightTheme={isLightTheme}
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
            <DataSelector 
                data={professores} 
                selectedValue={targetId} 
                onSelect={setTargetId} 
                inputBg={inputBg}
                textColor={textColor}
                isLightTheme={isLightTheme}
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