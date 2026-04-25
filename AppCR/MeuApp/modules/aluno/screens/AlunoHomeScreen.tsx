import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { getDashboardAlunoStyles } from '../styles/DashboardAlunoStyles';
import { AlunoStatCard } from '../components/AlunoStatCard';

export default function AlunoHomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const globalStyles = getGlobalStyles(theme);
  const styles = getDashboardAlunoStyles(theme);
  
  const [refreshing, setRefreshing] = useState(false);

  // Dados Estáticos para o Dashboard
  const stats = {
    disciplinas: 6,
    atividadesPendentes: 3,
    mediaGeral: "8.5",
    presencaTotal: "92%",
    materiaisNovos: 12,
    mensagensPrivadas: 2
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simula um delay de carregamento
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a' }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={[globalStyles.headerTitle, { fontSize: 24 }]}>
              Olá, {user?.full_name?.split(' ')[0] || 'Aluno'}
            </Text>
            <Text style={styles.subtitle}>Foco nos estudos! Veja seu resumo.</Text>
          </View>
          <MaterialCommunityIcons 
            name="bell-outline" 
            size={24} 
            color={theme === 'light' ? '#1e293b' : '#fff'} 
          />
        </View>
        

        <View style={styles.content}>
          {/* Card Principal de Destaque */}
          <View style={styles.mainCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>Área do Aluno</Text>
              <Text style={styles.mainCardSub}>Acompanhe seu desempenho acadêmico e materiais das aulas.</Text>
            </View>
            <FontAwesome5 name="user-graduate" size={40} color="rgba(255,255,255,0.2)" />
          </View>

          <Text style={styles.sectionTitle}>Meu Desempenho</Text>
          
          <View style={styles.grid}>
            <AlunoStatCard 
              label="Disciplinas" 
              value={stats.disciplinas} 
              theme={theme}
              icon={<FontAwesome5 name="book" size={18} color="#2563eb" />}
            />

            <AlunoStatCard 
              label="Atividades" 
              value={stats.atividadesPendentes} 
              theme={theme}
              icon={<Ionicons name="document-text" size={22} color="#2563eb" />}
            />

            <AlunoStatCard 
              label="Média Geral" 
              value={stats.mediaGeral} 
              theme={theme}
              icon={<Ionicons name="star" size={22} color="#facc15" />}
            />

            <AlunoStatCard 
              label="Frequência" 
              value={stats.presencaTotal} 
              theme={theme}
              icon={<MaterialCommunityIcons name="calendar-check" size={22} color="#22c55e" />}
            />

            <AlunoStatCard 
              label="Novos Materiais" 
              value={stats.materiaisNovos} 
              theme={theme}
              icon={<Ionicons name="cloud-download" size={22} color="#2563eb" />}
            />

            <AlunoStatCard 
              label="Mensagens" 
              value={stats.mensagensPrivadas} 
              theme={theme}
              icon={<MaterialCommunityIcons name="message-text" size={22} color="#2563eb" />}
            />
          </View>

          <View style={styles.footerInfo}>
            <Text style={styles.footerText}>
              Puxe para baixo para atualizar seus dados
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}