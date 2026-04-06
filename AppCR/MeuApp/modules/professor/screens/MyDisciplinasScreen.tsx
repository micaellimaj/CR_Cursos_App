import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { DisciplinaCard } from '../components/DisciplinaCard';
import styles from '../styles/MyDisciplinasStyles';

import { getMyDisciplinas } from '../controllers/disciplinaController';
import { useAuth } from '../../../contexts/AuthContext'; 
import { IDisciplinaProfessor } from '../types';

export default function MyDisciplinasScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { user } = useAuth(); 
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [disciplinas, setDisciplinas] = useState<IDisciplinaProfessor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDisciplinas = async () => {
    try {
      setLoading(true);
      const data = await getMyDisciplinas(user?.id);
      setDisciplinas(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao carregar disciplinas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={[styles.headerSection, { marginBottom: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons 
              name="book-multiple" 
              size={26} 
              color={isLightTheme ? '#1e3a8a' : '#fff'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Minhas Disciplinas
            </Text>
          </View>
          <Text style={styles.subtitle}>Gerencie seus conteúdos e atividades</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={disciplinas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <DisciplinaCard 
                item={item}
                isLightTheme={isLightTheme}
                onPress={() => navigation.navigate('DisciplinaMateriais', { 
                  disciplinaId: item.id,
                  disciplinaNome: item.nome, 
                })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="clipboard-text-search-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Nenhuma disciplina vinculada.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}