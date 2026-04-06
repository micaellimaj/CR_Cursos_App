import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { TurmaCard } from '../components/TurmaCard';
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

  return (
    <SafeAreaView 
      style={[
        globalStyles.container, 
        { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a', paddingHorizontal: 0 }
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <TurmaCard 
                item={item}
                isLightTheme={isLightTheme}
                userId={user?.id}
                onPress={() => navigation.navigate('TurmaDetail', { 
                  turmaId: item.id,
                  turmaNome: item.nome 
                })}
              />
            )}
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