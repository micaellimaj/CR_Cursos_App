import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/CourseManagementStyles';
import { CourseCard } from '../components/CourseCard';
import { SearchInput } from '../components/SearchInput';
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <FontAwesome5 name="graduation-cap" size={22} color={isLightTheme ? '#1e3a8a' : '#fff'} style={{ marginRight: 10 }} />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Cursos</Text>
          </View>
          <Text style={styles.subtitle}>Administre a grade curricular</Text>
        </View>

        <View style={styles.createButtonContainer}>
          <CustomButton title="+ Criar Novo Curso" onPress={() => handleOpenModal()} disabled={loading} />
        </View>

        <SearchInput isLightTheme={isLightTheme} />

        {loading && <ActivityIndicator size="large" color="#2563eb" style={{ marginVertical: 10 }} />}

        <FlatList
          data={courses}
          keyExtractor={(item) => item.id || Math.random().toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CourseCard 
              item={item} 
              isLightTheme={isLightTheme} 
              onEdit={() => handleOpenModal(item)}
              onDelete={() => item.id && handleDelete(item.id)}
            />
          )}
        />
      </View>

      {/* MODAL DE CRIAÇÃO / EDIÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
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

              <CustomButton title={loading ? "Salvando..." : "Confirmar"} onPress={handleSave} disabled={loading} />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}