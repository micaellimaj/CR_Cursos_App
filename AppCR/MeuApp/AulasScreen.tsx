import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';

export default function AulasScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  // Dados fictícios para progresso e seções
  const progress = 50; // Progresso do aluno em porcentagem
  const sections = [
    { id: '1', title: 'Conteúdos', icon: <Feather name="book-open" size={24} color="#fff" /> },
    { id: '2', title: 'Lista de Exercícios', icon: <FontAwesome5 name="tasks" size={24} color="#fff" /> },
    { id: '3', title: 'Simulados', icon: <MaterialIcons name="quiz" size={24} color="#fff" /> },
    { id: '4', title: 'Informações da Disciplina', icon: <FontAwesome5 name="info-circle" size={24} color="#fff" /> },
    { id: '5', title: 'Minhas Notas', icon: <MaterialIcons name="insert-chart-outlined" size={24} color="#fff" /> },
  ];

  return (
    <View style={globalStyles.container}>
      {/* Topo com progresso */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estruturas de Dados</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>2/4 Estudados - {progress}%</Text>
      </View>

      {/* Lista de seções */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.sectionCard}>
            {item.icon}
            <Text style={styles.sectionCardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.sectionsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#1e3a8a', // Azul escuro
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#cbd5e1', // Fundo do progresso
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563eb', // Azul claro para o progresso
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionsContainer: {
    padding: 20,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a', // Azul escuro
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  sectionCardText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});