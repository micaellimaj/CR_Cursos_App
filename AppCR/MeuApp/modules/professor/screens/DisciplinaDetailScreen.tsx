import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles';

export default function DisciplinaDetailScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome, turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Apenas Frequência e Notas
  const managementItems = [
    { title: 'Frequência', icon: 'calendar-check-outline', screen: 'FrequenciaChamada', color: '#d97706' },
    { title: 'Notas', icon: 'star-outline', screen: 'NotasLancamento', color: '#7c3aed' },
  ];

  // Estilo base para remover as sombras do arquivo MyDisciplinasStyles
  const cleanCardStyle = {
    ...styles.subjectCard,
    elevation: 0, // Remove sombra Android
    shadowOpacity: 0, // Remove sombra iOS
    borderWidth: 1,
    borderColor: isLightTheme ? '#e2e8f0' : '#334155',
    backgroundColor: isLightTheme ? '#fff' : '#1e293b',
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={26} color={isLightTheme ? '#1e3a8a' : '#fff'} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{disciplinaNome}</Text>
          </View>
          <Text style={styles.subtitle}>Gerenciamento de Turma</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Botão de Destaque para Materiais e Atividades */}
          <TouchableOpacity 
            style={[cleanCardStyle as any, { marginBottom: 20, padding: 20, borderLeftWidth: 5, borderLeftColor: '#2563eb' }]}
            onPress={() => navigation.navigate('DisciplinaMateriais', { ...route.params })}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 18 }]}>Pedagógico</Text>
              <Text style={styles.courseTag}>Conteúdos e Atividades</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={28} color="#2563eb" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {managementItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={[cleanCardStyle as any, { width: '48%', flexDirection: 'column', height: 120, justifyContent: 'center' }]}
                onPress={() => navigation.navigate(item.screen, { ...route.params })}
              >
                <MaterialCommunityIcons name={item.icon as any} size={32} color={item.color} />
                <Text style={[styles.subjectName, { marginTop: 10, fontSize: 14, color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}