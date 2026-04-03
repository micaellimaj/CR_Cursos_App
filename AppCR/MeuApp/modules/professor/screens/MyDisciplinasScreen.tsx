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
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          // Estilo baseado na tela de Materiais (Sem sombra, com borda)
          elevation: 0, 
          shadowOpacity: 0, 
          borderWidth: 1, 
          borderColor: isLightTheme ? '#e2e8f0' : '#334155',
          padding: 20,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center'
        }
      ]}
      onPress={() => navigation.navigate('DisciplinaMateriais', { 
        disciplinaId: item.id,
        disciplinaNome: item.nome, 
      })}
      activeOpacity={0.7}
    >
      {/* Ícone com tom azul igual ao de Materiais */}
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)', width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }]}>
        <MaterialCommunityIcons name="book-open-outline" size={26} color="#2563eb" />
      </View>

      <View style={[styles.subjectInfo, { marginLeft: 15, flex: 1 }]}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 16, fontWeight: 'bold' }]}>
          {item.nome}
        </Text>
        
        {/* Tag de Turmas seguindo o estilo de descrição */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialCommunityIcons name="account-group-outline" size={14} color="#64748b" />
          <Text style={[styles.courseTag, { marginLeft: 4, color: '#64748b' }]}>
            {item.turmasAssociadas?.length || 0} turmas vinculadas
          </Text>
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
    <SafeAreaView 
      style={[
        globalStyles.container, 
        { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }
      ]}
    >
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
            renderItem={({ item }) => renderSubjectCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
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