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
import { ITurma } from '../types';

export default function ClassManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados de Dados
  const [classes, setClasses] = useState<ITurma[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modais
  const [modalVisible, setModalVisible] = useState(false);
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [teacherModalVisible, setTeacherModalVisible] = useState(false);

  // Estados de Form
  const [selectedClass, setSelectedClass] = useState<ITurma | null>(null);
  const [formData, setFormData] = useState({ nome: '', curso_id: '', data_inicio: '', data_fim: '' });
  const [targetId, setTargetId] = useState(''); // ID do aluno ou professor para as ações

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  useEffect(() => { fetchTurmas(); }, []);

  const fetchTurmas = async () => {
    try {
      setLoading(true);
      const data = await getAllTurmas();
      setClasses(Array.isArray(data) ? data : []);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as turmas.");
    } finally { setLoading(false); }
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
      fetchTurmas();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleAction = async (type: 'enroll' | 'teacher') => {
    if (!selectedClass?.id || !targetId) return;
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
      fetchTurmas();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta turma?", [
      { text: "Cancelar" },
      { text: "Sim", style: 'destructive', onPress: async () => {
        await deleteTurma(id);
        fetchTurmas();
      }}
    ]);
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Turmas</Text>
          <Text style={styles.subtitle}>Crie turmas, matricule alunos e gerencie professores</Text>
        </View>

        <CustomButton title="+ Nova Turma" onPress={() => handleOpenMainModal()} />

        {loading && <ActivityIndicator color="#2563eb" style={{ marginVertical: 10 }} />}

        <FlatList
          data={classes}
          keyExtractor={(item) => item.id || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.classCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.classHeader}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="users" size={18} color="#2563eb" />
                </View>
                <View style={styles.classMainInfo}>
                  <Text style={[styles.className, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.nome}</Text>
                  <Text style={styles.classSubDetails}>Curso: {item.curso_id}</Text>
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

              <View style={styles.tagRow}>
                <View style={styles.infoTag}>
                   <Feather name="calendar" size={12} color="#475569" />
                   <Text style={styles.tagText}>{item.data_inicio} até {item.data_fim}</Text>
                </View>
                <View style={styles.infoTag}>
                   <Feather name="users" size={12} color="#475569" />
                   <Text style={styles.tagText}>{Object.keys(item.alunos || {}).length} alunos</Text>
                </View>
              </View>

              <View style={styles.manageButtons}>
                <TouchableOpacity 
                    style={styles.actionTextButton} 
                    onPress={() => { setSelectedClass(item); setEnrollModalVisible(true); }}
                >
                  <Ionicons name="person-add-outline" size={14} color={isLightTheme ? "#1e293b" : "#fff"} />
                  <Text style={[styles.actionText, {color: isLightTheme ? "#1e293b" : "#fff"}]}>Matricular</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.actionTextButton}
                    onPress={() => { setSelectedClass(item); setTeacherModalVisible(true); }}
                >
                  <Ionicons name="git-network-outline" size={14} color={isLightTheme ? "#1e293b" : "#fff"} />
                  <Text style={[styles.actionText, {color: isLightTheme ? "#1e293b" : "#fff"}]}>Professor</Text>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput placeholder="Nome da Turma" value={formData.nome} onChangeText={t => setFormData({...formData, nome: t})} style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} />
              <TextInput placeholder="ID do Curso" value={formData.curso_id} onChangeText={t => setFormData({...formData, curso_id: t})} style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} />
              <TextInput placeholder="Data Início (AAAA-MM-DD)" value={formData.data_inicio} onChangeText={t => setFormData({...formData, data_inicio: t})} style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} />
              <TextInput placeholder="Data Fim (AAAA-MM-DD)" value={formData.data_fim} onChangeText={t => setFormData({...formData, data_fim: t})} style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} />
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
            <TextInput 
              placeholder="Cole o ID do Aluno" 
              value={targetId} 
              onChangeText={setTargetId} 
              style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
            />
            <CustomButton title="Confirmar Matrícula" onPress={() => handleAction('enroll')} loading={loading} />
            <TouchableOpacity onPress={() => setEnrollModalVisible(false)} style={{ marginTop: 10 }}>
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
            <TextInput 
              placeholder="Cole o ID do Professor" 
              value={targetId} 
              onChangeText={setTargetId} 
              style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} 
            />
            <CustomButton title="Vincular Professor" onPress={() => handleAction('teacher')} loading={loading} />
            <TouchableOpacity onPress={() => setTeacherModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: '#ef4444', textAlign: 'center' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}