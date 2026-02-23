import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, TextInput, 
  Modal, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import styles from '../styles/SubjectManagementStyles';

export default function SubjectManagementScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Dados fictícios baseados na imagem
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Introdução à Programação', code: 'CS-110', course: 'Ciência da Computação', credits: '4', desc: 'Aprenda o básico de programação com exemplos práticos.' },
    { id: '2', name: 'Estrutura de Dados', code: 'CS-210', course: 'Ciência da Computação', credits: '4', desc: 'Estudo de vetores, pilhas, filas e árvores.' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);

  const labelColor = isLightTheme ? '#475569' : '#cbd5e1';
  const inputBg = isLightTheme ? '#f8fafc' : '#1e293b';

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Gestão de Disciplinas</Text>
          <Text style={styles.subtitle}>Crie e gerencie as matérias dos cursos</Text>
        </View>

        <CustomButton title="+ Nova Disciplina" onPress={() => { setSelectedSubject(null); setModalVisible(true); }} />

        {/* Filtro de Curso (Simulado) */}
        <View style={styles.filterContainer}>
           <TouchableOpacity style={[styles.pickerButton, { backgroundColor: inputBg }]}>
              <Text style={{ color: labelColor }}>Todos os Cursos</Text>
              <Feather name="chevron-down" size={18} color={labelColor} />
           </TouchableOpacity>
        </View>

        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Feather name="search" size={20} color="#94a3b8" />
          <TextInput placeholder="Buscar disciplina..." style={[styles.searchInput, { color: isLightTheme ? '#000' : '#fff' }]} placeholderTextColor="#94a3b8" />
        </View>

        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ width: '100%' }} // Força a lista a não vazar da tela
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
              <View style={styles.iconContainer}>
                <Ionicons name="layers-outline" size={24} color="#2563eb" />
              </View>
              <View style={styles.subjectInfo}>
                <View style={styles.subjectHeader}>
                  <Text style={[styles.subjectName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{item.name}</Text>
                  <Text style={styles.subjectCode}>{item.code}</Text>
                </View>
                <Text style={styles.courseTag}><Ionicons name="book-outline" size={12}/> {item.course}</Text>
                <Text style={styles.creditsTag}>{item.credits} créditos</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => { setSelectedSubject(item); setModalVisible(true); }}>
                  <Feather name="edit-2" size={18} color="#2563eb" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
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
                <Text style={[styles.inputLabel, { color: labelColor }]}>Curso Vinculado</Text>
                <TouchableOpacity style={[styles.input, { backgroundColor: inputBg, flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>{selectedSubject?.course || 'Selecionar Curso'}</Text>
                  <Feather name="chevron-down" size={20} color={labelColor} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Nome da Disciplina</Text>
                <TextInput style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} defaultValue={selectedSubject?.name} placeholder="Ex: Cálculo I" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Código</Text>
                <TextInput style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} defaultValue={selectedSubject?.code} placeholder="Ex: MAT-101" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Descrição</Text>
                <TextInput 
                  style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff', height: 80, textAlignVertical: 'top' }]} 
                  multiline 
                  defaultValue={selectedSubject?.desc} 
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { color: labelColor }]}>Créditos</Text>
                <TextInput style={[styles.input, { backgroundColor: inputBg, color: isLightTheme ? '#000' : '#fff' }]} defaultValue={selectedSubject?.credits} keyboardType="numeric" placeholder="Ex: 4" />
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.saveButtonText}>Salvar Disciplina</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}