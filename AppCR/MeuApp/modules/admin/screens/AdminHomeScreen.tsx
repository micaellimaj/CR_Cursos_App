import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/AdminHomeStyles';

export default function AdminHomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
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
          {/* Banner de destaque */}
          <View style={styles.mainCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>Gestão do Sistema</Text>
              <Text style={styles.mainCardSub}>Acesse relatórios e gerencie usuários em um só lugar.</Text>
                
            </View>
            <FontAwesome5 name="chart-line" size={50} color="rgba(255,255,255,0.2)" />
          </View>

          {/* Estatísticas */}
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

          {/* Ações Rápidas - ROTAS CORRIGIDAS */}
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.grid}>
            {/* 1. Novo Usuário -> Aponta para RegisterScreen */}
            <TouchableOpacity 
              style={styles.gridCard} 
              onPress={() => navigation.navigate('RegisterScreen')} 
            >
              <Ionicons name="person-add-outline" size={26} color="#fff" />
              <Text style={styles.gridCardText}>Novo Usuário</Text>
            </TouchableOpacity>

            {/* 2. Cursos -> Aponta para CourseManagement */}
            <TouchableOpacity 
              style={styles.gridCard} 
              onPress={() => navigation.navigate('CourseManagement')}
            >
              <FontAwesome5 name="graduation-cap" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Cursos</Text>
            </TouchableOpacity>

            {/* 3. Disciplinas -> Aponta para SubjectManagement */}
            <TouchableOpacity 
              style={styles.gridCard} 
              onPress={() => navigation.navigate('SubjectManagement')} 
            >
              <Ionicons name="book-outline" size={26} color="#fff" />
              <Text style={styles.gridCardText}>Disciplinas</Text>
            </TouchableOpacity>

            {/* 4. Turmas -> Aponta para ClassManagement */}
            <TouchableOpacity 
              style={styles.gridCard} 
              onPress={() => navigation.navigate('ClassManagement')}
            >
              <Ionicons name="people-outline" size={28} color="#fff" />
              <Text style={styles.gridCardText}>Turmas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}