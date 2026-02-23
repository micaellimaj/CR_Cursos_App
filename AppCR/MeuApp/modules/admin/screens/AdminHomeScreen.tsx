import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/AdminHomeStyles';

export default function AdminHomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  return (
    <View style={globalStyles.container}>
    <ScrollView>
      {/* Header seguindo seu padrão */}
      <View style={[globalStyles.header, styles.header]}>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.headerTitle}>Painel Administrativo</Text>
          <Text style={[styles.subtitle, { textAlign: 'left' }]}>Bem-vindo de volta, Admin</Text>
        </View>
        <TouchableOpacity style={styles.notificationBadge}>
          <MaterialIcons name="notifications-none" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Banner de destaque (Teaching journey da imagem) */}
        <View style={styles.mainCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.mainCardTitle}>Gestão do Sistema</Text>
            <Text style={styles.mainCardSub}>Acesse relatórios e gerencie usuários em um só lugar.</Text>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Ver Relatórios</Text>
            </TouchableOpacity>
          </View>
          <FontAwesome5 name="chart-line" size={50} color="rgba(255,255,255,0.2)" />
        </View>

        {/* Estatísticas (Cards 4x4 da imagem) */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <Feather name="users" size={20} color="#2563eb" />
            <Text style={[styles.statNumber, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>128</Text>
            <Text style={styles.statLabel}>Alunos Ativos</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
            <FontAwesome5 name="chalkboard-teacher" size={20} color="#2563eb" />
            <Text style={[styles.statNumber, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>14</Text>
            <Text style={styles.statLabel}>Professores</Text>
          </View>
        </View>

        {/* Atividades Recentes */}
        <Text style={styles.sectionTitle}>Atividade Recente</Text>
        <View style={[styles.activityItem, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
          <View style={styles.iconCircle}>
            <Feather name="user-plus" size={18} color="#fff" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={[styles.activityText, { color: isLightTheme ? '#000' : '#fff' }]}>Novo professor cadastrado</Text>
            <Text style={styles.activityTime}>Há 2 horas</Text>
          </View>
          <TouchableOpacity><Text style={{ color: '#2563eb' }}>Ver</Text></TouchableOpacity>
        </View>

        {/* Quick Actions (Botões inferiores) */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridCard} onPress={() => navigation.navigate('Cadastro')}>
            <Feather name="user-plus" size={24} color="#fff" />
            <Text style={styles.gridCardText}>Novo Usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard}>
            <MaterialIcons name="library-books" size={26} color="#fff" />
            <Text style={styles.gridCardText}>Cursos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
  );
}