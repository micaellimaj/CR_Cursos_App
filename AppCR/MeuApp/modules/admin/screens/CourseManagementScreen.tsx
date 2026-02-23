import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/CourseManagementStyles';

export default function CourseManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [courses, setCourses] = useState([
    { id: '1', name: 'Ciência da Computação', code: 'CC-101', desc: 'Introdução aos algoritmos e dados.', duration: '8 Semestres' },
    { id: '2', name: 'Matemática Aplicada', code: 'MAT-200', desc: 'Cálculo avançado e física.', duration: '4 Semestres' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

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
          onPress={() => { setSelectedCourse(null); setModalVisible(true); }} 
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

        {/* Lista de Cursos */}
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.courseCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.courseInfo}>
                <Text style={styles.courseCode}>{item.code}</Text>
                <Text style={[styles.courseName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{item.name}</Text>
                <Text style={styles.subtitle} numberOfLines={2}>{item.desc}</Text>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => { setSelectedCourse(item); setModalVisible(true); }}>
                  <Feather name="edit-2" size={20} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* MODAL RESPONSIVO PARA MOBILE */}
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
                    defaultValue={selectedCourse?.name}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isLightTheme ? '#475569' : '#cbd5e1' }]}>Código Identificador</Text>
                <TextInput 
                    style={[styles.input, { color: isLightTheme ? '#000' : '#fff', backgroundColor: isLightTheme ? '#f8fafc' : '#1e293b' }]} 
                    defaultValue={selectedCourse?.code}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: isLightTheme ? '#475569' : '#cbd5e1' }]}>Descrição Curta</Text>
                <TextInput 
                    style={[styles.input, { height: 100, textAlignVertical: 'top', color: isLightTheme ? '#000' : '#fff', backgroundColor: isLightTheme ? '#f8fafc' : '#1e293b' }]} 
                    multiline
                    defaultValue={selectedCourse?.desc}
                />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}