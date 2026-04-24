import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getDisciplinasByCurso } from '../controllers/disciplinaController';
import { AlunoItemCard } from '../components/AlunoItemCard';
import styles from '../styles/AlunoHomeStyles';
import { IDisciplina } from '../types';

export default function DisciplinasAlunoScreen({ route, navigation }: any) {
  const { cursoId, cursoNome } = route.params;
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [disciplinas, setDisciplinas] = useState<IDisciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const data = await getDisciplinasByCurso(cursoId);
        setDisciplinas(data);
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDisciplinas();
  }, [cursoId]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{cursoNome}</Text>
          <Text style={styles.subtitle}>Disciplinas disponíveis neste curso</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={disciplinas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlunoItemCard 
                title={item.nome}
                subtitle="Ver materiais e atividades"
                icon="book-open-page-variant-outline"
                isLightTheme={isLightTheme}
                onPress={() => navigation.navigate('DisciplinaDetailAluno', { 
                disciplinaId: item.id, 
                disciplinaNome: item.nome 
                })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="clipboard-off-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Nenhuma disciplina cadastrada neste curso.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}