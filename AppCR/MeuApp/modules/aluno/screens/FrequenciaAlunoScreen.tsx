import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, RefreshControl 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getFrequenciaPorAluno } from '../controllers/frequenciaController';
import { IFrequencia, IFrequenciaResumoResponse } from '../types';
import { getFrequenciaAlunoStyles } from '../styles/FrequenciaAlunoStyles';
import { FrequenciaHistoryCard } from '../components/FrequenciaHistoryCard';

export default function FrequenciaAlunoScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = getFrequenciaAlunoStyles(theme);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dados, setDados] = useState<IFrequenciaResumoResponse | null>(null);

  const loadFrequencia = async () => {
    if (!user?.id) return;
    try {
      const response = await getFrequenciaPorAluno(user.id);
      setDados(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadFrequencia(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadFrequencia();
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Minha Frequência</Text>
        </View>

        {/* Resumo de Presenças/Faltas */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="check-bold" size={20} color="#059669" />
            <Text style={[styles.statValue, { color: '#059669' }]}>
              {dados?.resumo.presencas || 0}
            </Text>
            <Text style={styles.statLabel}>Presenças</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialCommunityIcons name="close-thick" size={20} color="#dc2626" />
            <Text style={[styles.statValue, { color: '#dc2626' }]}>
              {dados?.resumo.faltas || 0}
            </Text>
            <Text style={styles.statLabel}>Faltas</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Histórico Detalhado</Text>

        <FlatList
          data={dados?.historico || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FrequenciaHistoryCard item={item} theme={theme} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
          }
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <MaterialCommunityIcons name="calendar-blank" size={48} color="#94a3b8" />
              <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhum registro encontrado.</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}