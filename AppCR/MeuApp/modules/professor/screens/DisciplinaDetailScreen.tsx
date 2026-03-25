import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles'; // Reaproveitando base de estilos

export default function DisciplinaDetailScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const menuItems = [
    { title: 'Conteúdos', icon: 'file-document-outline', screen: 'ConteudoProfessor', color: '#2563eb' },
    { title: 'Atividades', icon: 'clipboard-edit-outline', screen: 'AtividadeProfessor', color: '#059669' },
    { title: 'Frequência', icon: 'calendar-check-outline', screen: 'FrequenciaChamada', color: '#d97706' },
    { title: 'Notas', icon: 'star-outline', screen: 'NotasLancamento', color: '#7c3aed' },
  ];

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{disciplinaNome}</Text>
          <Text style={styles.subtitle}>Gerenciamento da Disciplina</Text>
        </View>

        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.subjectCard, { width: '48%', flexDirection: 'column', height: 120, justifyContent: 'center' }]}
              onPress={() => navigation.navigate(item.screen, { disciplinaId, disciplinaNome })}
            >
              <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
              <Text style={[styles.subjectName, { marginTop: 10, fontSize: 14 }]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}