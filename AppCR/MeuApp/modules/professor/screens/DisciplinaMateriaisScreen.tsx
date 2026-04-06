import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { PedagogicoCard } from '../components/PedagogicoCard';
import styles from '../styles/MyDisciplinasStyles';

const PEDAGOGICAL_ITEMS = [
  { title: 'Conteúdos', icon: 'file-document-outline', screen: 'ConteudoProfessor', color: '#2563eb', desc: 'Aulas e Materiais' },
  { title: 'Atividades', icon: 'clipboard-edit-outline', screen: 'AtividadeProfessor', color: '#2563eb', desc: 'Trabalhos e Provas' },
];

export default function DisciplinaMateriaisScreen({ route, navigation }: any) {
  const { disciplinaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={headerColor} />
            <Text style={{ marginLeft: 5, color: headerColor, fontWeight: '500' }}>Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: headerColor }]}>Materiais</Text>
          <Text style={styles.subtitle}>{disciplinaNome}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {PEDAGOGICAL_ITEMS.map((item, index) => (
            <PedagogicoCard 
              key={index}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              color={item.color}
              isLightTheme={isLightTheme}
              onPress={() => navigation.navigate(item.screen, { ...route.params })}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}