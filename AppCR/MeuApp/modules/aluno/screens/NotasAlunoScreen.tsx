import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/NotasAlunoStyles';
import { NotaAlunoCard } from '../components/NotaAlunoCard';
import { getNotasByDisciplina } from '../controllers/notaController';
import { INota } from '../types';

export default function NotasAlunoScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const [notas, setNotas] = useState<INota[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotas = async () => {
    try {
      const data = await getNotasByDisciplina(disciplinaId);
      setNotas(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotas(); }, [disciplinaId]);

  // Cálculo da média simples
  const media = notas.length > 0 
    ? (notas.reduce((acc, n) => acc + (n.valor ?? n.nota ?? 0), 0) / notas.length).toFixed(1)
    : "0.0";

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.headerSection}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={headerColor} />
            <Text style={{ marginLeft: 5, color: headerColor, fontWeight: '600' }}>Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: headerColor }]}>Minhas Notas</Text>
          <Text style={styles.subtitle}>{disciplinaNome}</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#f59e0b" size="large" style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Overview de Média */}
            <View style={[styles.scoreOverview, { 
              backgroundColor: isLightTheme ? '#fff' : '#1e293b',
              borderColor: isLightTheme ? '#e2e8f0' : '#334155' 
            }]}>
              <Text style={styles.averageLabel}>Média Atual</Text>
              <Text style={[styles.averageValue, { color: parseFloat(media) >= 7 ? '#10b981' : '#f59e0b' }]}>
                {media}
              </Text>
            </View>

            <Text style={[styles.listTitle, { color: isLightTheme ? '#1e293b' : '#fff' }]}>Histórico de Avaliações</Text>

            <FlatList
              data={notas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <NotaAlunoCard item={item} isLightTheme={isLightTheme} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={60} color="#cbd5e1" />
                  <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhuma nota lançada para esta disciplina.</Text>
                </View>
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}