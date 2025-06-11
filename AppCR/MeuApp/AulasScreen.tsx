import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';
import styles from './styles/AulasScreenStyles'; // Importando os estilos

export default function AulasScreen({ navigation }: any) { // Adicionado o objeto navigation
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  // Dados fictícios para progresso e seções
  const progress = 75; // Progresso do aluno em porcentagem
  const sections = [
    { id: '1', title: 'Apostilas', icon: <Feather name="book-open" size={24} color="#fff" />, screen: 'TelaConteudos' },
    { id: '2', title: 'Lista de Exercícios', icon: <FontAwesome5 name="tasks" size={24} color="#fff" /> },
    { id: '3', title: 'Simulados', icon: <MaterialIcons name="quiz" size={24} color="#fff" /> },
    { id: '4', title: 'Informações da Disciplina', icon: <FontAwesome5 name="info-circle" size={24} color="#fff" /> },
    { id: '5', title: 'Minhas Notas', icon: <MaterialIcons name="insert-chart-outlined" size={24} color="#fff" /> },
  ];

  return (
    <View style={globalStyles.container}>
      {/* Topo com progresso */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informática Profissional</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>3/4 Estudados - {progress}%</Text>
      </View>

      {/* Lista de seções */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.sectionCard}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen); // Navega para a tela especificada
              }
            }}
          >
            {item.icon}
            <Text style={styles.sectionCardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.sectionsContainer}
      />
    </View>
  );
}