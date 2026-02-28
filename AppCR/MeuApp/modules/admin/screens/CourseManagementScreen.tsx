import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/CourseManagementStyles';

// Importação dos Controllers e Types
import { createCurso, getAllCursos, deleteCurso, updateCurso } from '../controllers/cursoController';
import { ICurso } from '../types';

export default function CourseManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados da API
  const [courses, setCourses] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estados do Formulário
  const [selectedCourse, setSelectedCourse] = useState<ICurso | null>(null);
  const [formData, setFormData] = useState({ nome: '', descricao: '' });

  // Carregar cursos ao montar a tela
  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      setLoading(true);
      const data = await getAllCursos();
      setCourses(data);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (curso?: ICurso) => {
    if (curso) {
      setSelectedCourse(curso);
      setFormData({ nome: curso.nome, descricao: curso.descricao });
    } else {
      setSelectedCourse(null);
      setFormData({ nome: '', descricao: '' });
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      Alert.alert("Erro", "O nome do curso é obrigatório.");
      return;
    }

    try {
      setLoading(true);
      if (selectedCourse?.id) {
        // Lógica de Edição (Update)
        await updateCurso(selectedCourse.id, formData);
        Alert.alert("Sucesso", "Curso atualizado com sucesso!");
      } else {
        // Lógica de Criação (Create)
        await createCurso(formData);
        Alert.alert("Sucesso", "Curso cadastrado com sucesso!");
      }
      
      setModalVisible(false);
      fetchCursos();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir Curso", "Tem certeza que deseja remover este curso?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
        try {
          setLoading(true);
          await deleteCurso(id);
          fetchCursos();
        } catch (error: any) {
          Alert.alert("Não é possível excluir", error.message);
        } finally {
          setLoading(false);
        }
      }}
    ]);
  };

  return (
    <View style={[globalStyles.container, { paddingBottom: 0 }]}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Cursos</Text>
          <Text style={styles.subtitle}>Administre a grade curricular</Text>
        </View>

        <CustomButton 
          title="+ Criar Novo Curso" 
          onPress={() => handleOpenModal()} 
          disabled={loading}
        />

        {/* Busca */}
        <View style={[styles.searchBar, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
          <Feather name="search" size={20} color="#94a3b8" />
          <TextInput 
            placeholder="Pesquisar..." 
            style={[styles.searchInput, { color: isLightTheme ? '#000' : '#fff' }]} 
            placeholderTextColor="#94a3b8" 
          />
        </View>

        {loading && <ActivityIndicator size="large" color="#2563eb" style={{ marginVertical: 10 }} />}

        {/* Lista de Cursos */}
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id || Math.random().toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.courseCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{item.id?.substring(0, 8)}</Text>
                <Text style={[styles.courseName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{item.nome}</Text>
                <Text style={styles.subtitle} numberOfLines={2}>{item.descricao}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => handleOpenModal(item)}>
                  <Feather name="edit-2" size={20} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={() => item.id && handleDelete(item.id)}>
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* MODAL DE CRIAÇÃO / EDIÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} statusBarTranslucent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContent, { backgroundColor: isLightTheme ? '#fff' : '#0f172a' }]}>
            
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
                {selectedCourse ? 'Editar Curso' : 'Novo Curso'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={28} color={isLightTheme ? '#64748b' : '#94a3b8'} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isLightTheme ? '#475569' : '#cbd5e1' }]}>Nome do Curso</Text>
                <TextInput 
                  style={[styles.input, { color: isLightTheme ? '#000' : '#fff', backgroundColor: isLightTheme ? '#f8fafc' : '#1e293b' }]} 
                  value={formData.nome}
                  onChangeText={(text) => setFormData({ ...formData, nome: text })}
                  placeholder="Ex: Ciência da Computação"
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isLightTheme ? '#475569' : '#cbd5e1' }]}>Descrição Curta</Text>
                <TextInput 
                  style={[styles.input, { height: 100, textAlignVertical: 'top', color: isLightTheme ? '#000' : '#fff', backgroundColor: isLightTheme ? '#f8fafc' : '#1e293b' }]} 
                  multiline
                  value={formData.descricao}
                  onChangeText={(text) => setFormData({ ...formData, descricao: text })}
                  placeholder="Descreva brevemente o curso..."
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <CustomButton 
                title={loading ? "Salvando..." : "Confirmar"} 
                onPress={handleSave} 
                disabled={loading}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}