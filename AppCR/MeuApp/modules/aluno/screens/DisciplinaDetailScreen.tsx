import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/AlunoHomeStyles';
import { PedagogicoAlunoCard } from '../components/PedagogicoAlunoCard';

const ALUNO_ITEMS = [
  { 
    title: 'Conteúdos', 
    icon: 'file-document-outline', 
    screen: 'ConteudoAluno', // Ajuste conforme o nome das futuras telas
    color: '#2563eb', 
    desc: 'Materiais de estudo e aulas' 
  },
  { 
    title: 'Atividades', 
    icon: 'clipboard-edit-outline', 
    screen: 'AtividadeAluno', 
    color: '#10b981', // Verde para atividades
    desc: 'Tarefas e avaliações' 
  },
  { 
    title: 'Minhas Notas', 
    icon: 'chart-bar', 
    screen: 'NotasAluno', 
    color: '#f59e0b', // Amarelo/Laranja para notas
    desc: 'Desempenho acadêmico' 
  },
];

export default function DisciplinaDetailScreen({ route, navigation }: any) {
  // Recebe o nome da disciplina do card anterior
  const { disciplinaNome, disciplinaId } = route.params;
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }}>
      <View style={styles.content}>
        
        {/* Header com Voltar */}
        <View style={styles.headerSection}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={headerColor} />
            <Text style={{ marginLeft: 5, color: headerColor, fontWeight: '600' }}>Voltar</Text>
          </TouchableOpacity>
          
          <Text style={[styles.title, { color: headerColor }]}>Área da Disciplina</Text>
          <Text style={styles.subtitle}>{disciplinaNome || 'Detalhes'}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          {ALUNO_ITEMS.map((item, index) => (
            <PedagogicoAlunoCard 
              key={index}
              title={item.title}
              desc={item.desc}
              icon={item.icon as any}
              color={item.color}
              isLightTheme={isLightTheme}
              onPress={() => navigation.navigate(item.screen, { 
                disciplinaId, 
                disciplinaNome 
              })}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}