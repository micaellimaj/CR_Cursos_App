import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { FontAwesome5, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/AdminHomeStyles';
import { getDashboardStats } from '../controllers/dashboardController';

export default function AdminHomeScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const titleColor = isLightTheme ? '#1e3a8a' : '#fff';

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalAlunos: 0,
    totalProfessores: 0,
    totalCursos: 0,
    totalDisciplinas: 0,
    totalTurmas: 0,
  });

  const loadData = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  // Função auxiliar para renderizar os números ou o loading
  const renderStat = (value: number) => {
    return loading ? (
      <ActivityIndicator size="small" color="#2563eb" />
    ) : (
      <Text style={[styles.statNumber, { color: titleColor }]}>{value}</Text>
    );
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />}
      >
        <View style={[globalStyles.header, styles.header]}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.headerTitle}>Painel Administrativo</Text>
            <Text style={[styles.subtitle, { textAlign: 'left' }]}>Visão geral do sistema</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: loading ? '#facc15' : '#22c55e', marginRight: 5 }} />
             <Text style={{ fontSize: 10, color: '#64748b' }}>{loading ? 'Sincronizando...' : 'Sistema Online'}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.mainCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>Resumo Geral</Text>
              <Text style={styles.mainCardSub}>Contagem em tempo real da base de dados.</Text>
            </View>
            <MaterialCommunityIcons name="view-dashboard-outline" size={50} color="rgba(255,255,255,0.2)" />
          </View>

          <Text style={styles.sectionTitle}>Estatísticas da Organização</Text>
          
          <View style={styles.grid}>
            {/* Total Geral */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><Feather name="users" size={22} color="#2563eb" /></View>
              {renderStat(stats.totalUsuarios)}
              <Text style={styles.statLabel}>Usuários Totais</Text>
            </View>

            {/* Alunos */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><Ionicons name="school-outline" size={22} color="#2563eb" /></View>
              {renderStat(stats.totalAlunos)}
              <Text style={styles.statLabel}>Alunos</Text>
            </View>

            {/* Professores */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><FontAwesome5 name="chalkboard-teacher" size={18} color="#2563eb" /></View>
              {renderStat(stats.totalProfessores)}
              <Text style={styles.statLabel}>Professores</Text>
            </View>

            {/* Cursos */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><FontAwesome5 name="graduation-cap" size={18} color="#2563eb" /></View>
              {renderStat(stats.totalCursos)}
              <Text style={styles.statLabel}>Cursos</Text>
            </View>

            {/* Disciplinas */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><Ionicons name="book-outline" size={22} color="#2563eb" /></View>
              {renderStat(stats.totalDisciplinas)}
              <Text style={styles.statLabel}>Disciplinas</Text>
            </View>

            {/* Turmas */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}><Ionicons name="people-outline" size={24} color="#2563eb" /></View>
              {renderStat(stats.totalTurmas)}
              <Text style={styles.statLabel}>Turmas</Text>
            </View>
          </View>

          <View style={{ marginTop: 20, padding: 15, borderRadius: 12, backgroundColor: 'rgba(37, 99, 235, 0.05)', borderStyle: 'dashed', borderWidth: 1, borderColor: '#2563eb' }}>
              <Text style={{ color: '#2563eb', fontWeight: 'bold', textAlign: 'center' }}>
                Arraste para baixo para atualizar os dados
              </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}