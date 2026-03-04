import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FontAwesome5, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/AdminHomeStyles';

export default function AdminHomeScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estilo de cor condicional para os cards brancos/escuros
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const titleColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[globalStyles.header, styles.header]}>
          <View style={{ flex: 1 }}>
            <Text style={globalStyles.headerTitle}>Painel Administrativo</Text>
            <Text style={[styles.subtitle, { textAlign: 'left' }]}>Visão geral do sistema</Text>
          </View>
          {/* Status do Sistema (Ideia adicional) */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e', marginRight: 5 }} />
             <Text style={{ fontSize: 10, color: '#64748b' }}>Sistema Online</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Banner Principal - Focado em Resumo */}
          <View style={styles.mainCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>Resumo Geral</Text>
              <Text style={styles.mainCardSub}>Confira os números totais da sua instituição hoje.</Text>
            </View>
            <MaterialCommunityIcons name="view-dashboard-outline" size={50} color="rgba(255,255,255,0.2)" />
          </View>

          <Text style={styles.sectionTitle}>Estatísticas da Organização</Text>
          
          <View style={styles.grid}>
            {/* Total de Usuários (Alunos + Profs) */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}>
                <Feather name="users" size={22} color="#2563eb" />
              </View>
              <Text style={[styles.statNumber, { color: titleColor }]}>142</Text>
              <Text style={styles.statLabel}>Usuários Totais</Text>
            </View>

            {/* Total de Cursos */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="graduation-cap" size={20} color="#2563eb" />
              </View>
              <Text style={[styles.statNumber, { color: titleColor }]}>12</Text>
              <Text style={styles.statLabel}>Cursos Ativos</Text>
            </View>

            {/* Total de Disciplinas */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}>
                <Ionicons name="book-outline" size={22} color="#2563eb" />
              </View>
              <Text style={[styles.statNumber, { color: titleColor }]}>48</Text>
              <Text style={styles.statLabel}>Disciplinas</Text>
            </View>

            {/* Total de Turmas */}
            <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
              <View style={styles.iconCircle}>
                <Ionicons name="people-outline" size={24} color="#2563eb" />
              </View>
              <Text style={[styles.statNumber, { color: titleColor }]}>24</Text>
              <Text style={styles.statLabel}>Turmas Fechadas</Text>
            </View>
          </View>

          {/* Espaço para Atividades Recentes ou Logs (Ideia para o futuro) */}
          <View style={{ marginTop: 10, padding: 15, borderRadius: 12, backgroundColor: 'rgba(37, 99, 235, 0.05)', borderStyle: 'dashed', borderWidth: 1, borderColor: '#2563eb' }}>
             <Text style={{ color: '#2563eb', fontWeight: 'bold', textAlign: 'center' }}>Novos relatórios estarão disponíveis em breve.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}