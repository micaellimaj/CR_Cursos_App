import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles'; 

// Controllers e Tipagens
import { getMyTurmas } from '../controllers/turmaController';
import { useAuth } from '../../../contexts/AuthContext'; 
import { ITurmaProfessor } from '../types';

export default function MyTurmasScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { user } = useAuth(); 
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [turmas, setTurmas] = useState<ITurmaProfessor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTurmas = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const data = await getMyTurmas(user.id);
        setTurmas(data);
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao carregar turmas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  const renderTurmaCard = (item: ITurmaProfessor) => (
    <TouchableOpacity 
      style={[
        styles.subjectCard, 
        { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }
      ]}
      onPress={() => navigation.navigate('TurmaDetail', { 
        turmaId: item.id,
        turmaNome: item.nome 
      })}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(5, 150, 105, 0.1)' }]}>
        <MaterialCommunityIcons name="google-classroom" size={24} color="#059669" />
      </View>

      <View style={styles.subjectInfo}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
          {item.nome}
        </Text>
        <Text style={styles.courseTag}>Início: {new Date(item.data_inicio).toLocaleDateString('pt-BR')}</Text>
        
        <View style={styles.tagRow}>
          <View style={[styles.infoTag, { backgroundColor: 'rgba(5, 150, 105, 0.1)' }]}>
            <MaterialCommunityIcons name="account-tie" size={14} color="#059669" />
            <Text style={[styles.tagText, { color: '#059669' }]}>
              {item.professor_principal_id === user?.id ? 'Titular' : 'Colaborador'}
            </Text>
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
          {/* Corrigido de <div> para <View> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <MaterialCommunityIcons 
              name="account-group-outline" 
              size={26} 
              color={isLightTheme ? '#1e3a8a' : '#fff'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Minhas Turmas
            </Text>
          </View>
          <Text style={styles.subtitle}>Gerencie seus alunos e diários de classe</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#059669" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={turmas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderTurmaCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="account-off-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Você não possui turmas vinculadas.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}