import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles';

// Controllers e Tipagens
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
      // O ID do professor vem do seu AuthContext para filtrar na API
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

  const renderSubjectCard = (item: IDisciplinaProfessor) => (
    <TouchableOpacity 
      style={[
        styles.subjectCard, 
        { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }
      ]}
      onPress={() => navigation.navigate('DisciplinaMateriais', { 
        disciplinaId: item.id,
        disciplinaNome: item.nome, 
      })}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="book-outline" size={24} color="#2563eb" />
      </View>

      <View style={styles.subjectInfo}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
          {item.nome}
        </Text>
        <Text style={styles.courseTag}>ID: {item.id.substring(0, 8).toUpperCase()}</Text>
        
        <View style={styles.tagRow}>
          <View style={[styles.infoTag, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
            <MaterialCommunityIcons name="account-group" size={14} color="#2563eb" />
            <Text style={styles.tagText}>{item.turmasAssociadas?.length || 0} Turmas</Text>
          </View>
        </View>
      </View>

      <MaterialCommunityIcons 
        name="chevron-right" 
        size={24} 
        color={isLightTheme ? '#cbd5e1' : '#475569'} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <MaterialCommunityIcons 
              name="book-open-page-variant" 
              size={26} 
              color={isLightTheme ? '#1e3a8a' : '#fff'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Minhas Disciplinas
            </Text>
          </View>
          <Text style={styles.subtitle}>Selecione uma disciplina para gerenciar</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={disciplinas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderSubjectCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="clipboard-text-search-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Nenhuma disciplina vinculada ao seu perfil.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}