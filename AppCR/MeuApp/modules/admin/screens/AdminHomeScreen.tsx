import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { FontAwesome5, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/AdminHomeStyles';
import { getDashboardStats } from '../controllers/dashboardController';
import { StatCard } from '../components/StatCard';

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

  return (
    <View style={globalStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />}
      >
        {/* Header simplificado visualmente */}
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
            <StatCard 
              label="Usuários Totais" 
              value={stats.totalUsuarios} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Feather name="users" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Alunos" 
              value={stats.totalAlunos} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="school-outline" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Professores" 
              value={stats.totalProfessores} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<FontAwesome5 name="chalkboard-teacher" size={18} color="#2563eb" />}
            />

            <StatCard 
              label="Cursos" 
              value={stats.totalCursos} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<FontAwesome5 name="graduation-cap" size={18} color="#2563eb" />}
            />

            <StatCard 
              label="Disciplinas" 
              value={stats.totalDisciplinas} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="book-outline" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Turmas" 
              value={stats.totalTurmas} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="people-outline" size={24} color="#2563eb" />}
            />
          </View>

          <View style={styles.footerInfo}>
              <Text style={styles.footerText}>
                Arraste para baixo para atualizar os dados
              </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}