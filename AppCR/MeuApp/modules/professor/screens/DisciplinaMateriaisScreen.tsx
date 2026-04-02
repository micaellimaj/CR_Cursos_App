import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles';

export default function DisciplinaMateriaisScreen({ route, navigation }: any) {
  const { disciplinaNome, isLightTheme: paramTheme } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const pedagogicalItems = [
    { title: 'Conteúdos', icon: 'file-document-outline', screen: 'ConteudoProfessor', color: '#2563eb', desc: 'Aulas e Materiais' },
    { title: 'Atividades', icon: 'clipboard-edit-outline', screen: 'AtividadeProfessor', color: '#059669', desc: 'Trabalhos e Provas' },
  ];

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={isLightTheme ? '#1e3a8a' : '#fff'} />
            <Text style={{ marginLeft: 5, color: isLightTheme ? '#1e3a8a' : '#fff' }}>Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Materiais</Text>
          <Text style={styles.subtitle}>{disciplinaNome}</Text>
        </View>

        <ScrollView>
          {pedagogicalItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.subjectCard, { 
                elevation: 0, 
                shadowOpacity: 0, 
                borderWidth: 1, 
                borderColor: isLightTheme ? '#e2e8f0' : '#334155',
                backgroundColor: isLightTheme ? '#fff' : '#1e293b',
                padding: 20,
                marginBottom: 15
              }]}
              onPress={() => navigation.navigate(item.screen, { ...route.params })}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
              </View>
              <View style={styles.subjectInfo}>
                <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.title}</Text>
                <Text style={styles.courseTag}>{item.desc}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}