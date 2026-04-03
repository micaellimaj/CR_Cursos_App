import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyDisciplinasStyles'; 

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
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await getMyTurmas(user.id);
      setTurmas(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao carregar turmas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, [user?.id]);

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
      {/* 1. Fundo do ícone principal alterado de verde para azul transparente */}
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
        <MaterialCommunityIcons name="google-classroom" size={24} color="#2563eb" />
      </View>

      <View style={styles.subjectInfo}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
          {item.nome}
        </Text>
        <Text style={styles.courseTag}>Início: {new Date(item.data_inicio).toLocaleDateString('pt-BR')}</Text>
        
        <View style={styles.tagRow}>
          {/* 2. Fundo da tag 'Titular/Colaborador' alterado para azul transparente */}
          <View style={[styles.infoTag, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
            <MaterialCommunityIcons name="account-tie" size={14} color="#2563eb" />
            <Text style={[styles.tagText, { color: '#2563eb' }]}>
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
    <SafeAreaView 
      style={[
        globalStyles.container, 
        { 
          backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a',
          paddingHorizontal: 0 
        }
      ]}
    >
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <MaterialCommunityIcons 
              name="account-group-outline" 
              size={28} 
              color={isLightTheme ? '#1e3a8a' : '#60a5fa'} 
              style={{ marginRight: 10 }} 
            />
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
              Minhas Turmas
            </Text>
          </View>
          <Text style={styles.subtitle}>Gerencie seus alunos e diários de classe</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={turmas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderTurmaCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="account-off-outline" size={64} color="#cbd5e1" />
                <Text style={styles.emptyText}>Você não possui turmas vinculadas no momento.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}