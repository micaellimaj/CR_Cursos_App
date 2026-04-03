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
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          // NOVO PADRÃO: Borda em vez de sombra
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
      onPress={() => navigation.navigate('TurmaDetail', { 
        turmaId: item.id,
        turmaNome: item.nome 
      })}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)', width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }]}>
        <MaterialCommunityIcons name="google-classroom" size={26} color="#2563eb" />
      </View>

      <View style={[styles.subjectInfo, { marginLeft: 15, flex: 1 }]}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 16, fontWeight: 'bold' }]}>
          {item.nome}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <View style={{ 
            backgroundColor: 'rgba(37, 99, 235, 0.08)', 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <MaterialCommunityIcons name="account-tie" size={12} color="#2563eb" />
            <Text style={{ color: '#2563eb', fontSize: 11, fontWeight: '600', marginLeft: 4 }}>
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