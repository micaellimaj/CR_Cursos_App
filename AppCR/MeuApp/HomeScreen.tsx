import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';
import styles from './styles/HomeScreenStyles'; // Importando os estilos
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Ícones

export default function HomeScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return (
    <View style={globalStyles.container}>
      {/* Topo com boas-vindas */}
      <View style={[globalStyles.header, styles.header]}>
        <View>
          <Text style={globalStyles.headerTitle}>Olá, Matheus</Text>
          <Text style={globalStyles.headerSubtitle}>Ciência da computação</Text>
        </View>
        <Image
          source={{ uri: 'https://via.placeholder.com/100x100.png' }} // Substitua com o avatar real
          style={styles.avatar}
        />
      </View>

      {/* Conteúdo principal */}
      <View style={globalStyles.body}>
        <Text style={globalStyles.title}>Cursos em andamento</Text>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Continue de onde parou</Text>
          <Text style={styles.cardTitle}>Tema 2 - Estruturas de dados heterogêneas</Text>
        </View>

        {/* Seção de "Meu curso" */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Meu curso</Text>

          <View style={styles.grid}>
            {/* Disciplinas e avaliações */}
            <TouchableOpacity style={styles.gridCard}>
              <FontAwesome5 name="th-large" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Disciplinas e avaliações</Text>
            </TouchableOpacity>

            {/* Notas e histórico */}
            <TouchableOpacity style={styles.gridCard}>
              <MaterialIcons name="insert-chart-outlined" size={26} color="#fff" />
              <Text style={styles.gridCardText}>Notas e histórico</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Rodapé */}
      <View style={globalStyles.footer}>
        <Text style={globalStyles.footerText}>Desenvolvido por CR Cursos Educacional</Text>
      </View>
    </View>
  );
}