import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getAllCursos } from '../controllers/cursoController';
import { AlunoItemCard } from '../components/AlunoItemCard';
import styles from '../styles/AlunoHomeStyles';
import { ICurso } from '../types';

export default function CursosScreen({ navigation }: any) {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [cursos, setCursos] = useState<ICurso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await getAllCursos();
        setCursos(data);
      } catch (error: any) {
        Alert.alert("Erro", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCursos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Meus Cursos</Text>
          <Text style={styles.subtitle}>Selecione um curso para ver as disciplinas</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={cursos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <AlunoItemCard 
                title={item.nome}
                subtitle="Toque para ver a grade curricular"
                icon="school-outline"
                isLightTheme={isLightTheme}
                onPress={() => navigation.navigate('DisciplinasAluno', { cursoId: item.id, cursoNome: item.nome })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="book-search-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Nenhum curso encontrado.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}