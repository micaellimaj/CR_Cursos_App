import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../../admin/styles/AdminHomeStyles'; // Reaproveitando a estrutura de estilos
import { StatCard } from '../../admin/components/StatCard'; // Reaproveitando o componente de card

export default function ProfessorHomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const titleColor = isLightTheme ? '#1e3a8a' : '#fff';

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estado para os KPIs do Professor
  const [stats, setStats] = useState({
    meusAlunos: 0,
    minhasTurmas: 0,
    minhasDisciplinas: 0,
    materiaisPostados: 0,
    avisosMural: 0,
    mensagensPendentes: 0
  });

  const loadData = async () => {
    try {
      setLoading(true);
      // Aqui entrará a chamada para o seu controller futuro:
      // const data = await getProfessorDashboardStats(user?.id);
      // setStats(data);
      
      // Simulação de dados temporária
      setStats({
        meusAlunos: 42,
        minhasTurmas: 5,
        minhasDisciplinas: 3,
        materiaisPostados: 12,
        avisosMural: 8,
        mensagensPendentes: 2
      });
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
        {/* Header com Saudação Personalizada */}
        <View style={[globalStyles.header, styles.header]}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.headerTitle}>Olá, Prof. {user?.nome?.split(' ')[0]}</Text>
            <Text style={[styles.subtitle, { textAlign: 'left' }]}>Bom dia! Veja o resumo das suas turmas.</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: loading ? '#facc15' : '#22c55e', marginRight: 5 }} />
             <Text style={{ fontSize: 10, color: '#64748b' }}>{loading ? 'Sincronizando...' : 'Online'}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Card de Boas-vindas / CTA */}
          <View style={[styles.mainCard, { backgroundColor: '#2563eb' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>Área Docente</Text>
              <Text style={styles.mainCardSub}>Gerencie suas notas, frequências e conteúdos em um só lugar.</Text>
            </View>
            <MaterialCommunityIcons name="presentation" size={50} color="rgba(255,255,255,0.2)" />
          </View>

          <Text style={styles.sectionTitle}>Estatísticas das Minhas Aulas</Text>
          
          <View style={styles.grid}>
            <StatCard 
              label="Total de Alunos" 
              value={stats.meusAlunos} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="people" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Minhas Turmas" 
              value={stats.minhasTurmas} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<MaterialCommunityIcons name="google-classroom" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Disciplinas" 
              value={stats.minhasDisciplinas} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<FontAwesome5 name="book" size={18} color="#2563eb" />}
            />

            <StatCard 
              label="Materiais" 
              value={stats.materiaisPostados} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="cloud-upload-outline" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Avisos no Mural" 
              value={stats.avisosMural} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<MaterialCommunityIcons name="bulletin-board" size={22} color="#2563eb" />}
            />

            <StatCard 
              label="Mensagens" 
              value={stats.mensagensPendentes} 
              loading={loading} 
              cardBg={cardBg} 
              titleColor={titleColor}
              icon={<Ionicons name="chatbox-ellipses-outline" size={22} color="#2563eb" />}
            />
          </View>

          <View style={styles.footerInfo}>
              <Text style={styles.footerText}>
                Arraste para baixo para atualizar o painel
              </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}