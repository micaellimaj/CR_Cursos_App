import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';
import styles from './styles/HomeScreenStyles';
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  const [isExpanded, setIsExpanded] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    setUserPhotoUrl('https://randomuser.me/api/portraits/men/32.jpg');
  }, []);

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.header, styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.headerTitle}>Olá, Matheus Feliciano</Text>
        </View>

        <View style={{ marginLeft: 24 }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{
              position: 'absolute',
              top: -12,
              right: -8,
              zIndex: 2,
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 2,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 2,
            }}>
              <MaterialIcons name="notifications-none" size={22} color="#2563eb" />
            </TouchableOpacity>
            
            <Image
              source={userPhotoUrl ? { uri: userPhotoUrl } : require('./assets/aluno.png')}
              style={styles.avatar}
            />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Disciplina em andamento</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TelaConteudos')}
        >
          <Text style={styles.subtitle}>Continuar estudando...</Text>
          <Text style={styles.cardTitle}>Módulo 1 - Sistemas Operacionais</Text>
        </TouchableOpacity>

        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Meu curso</Text>

          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridCard}>
              <FontAwesome5 name="th-large" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Disciplinas e avaliações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Notas')}
            >
              <MaterialIcons name="insert-chart-outlined" size={26} color="#fff" />
              <Text style={styles.gridCardText}>Notas e histórico</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.grid, { marginTop: 20 }]}>
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('AulasScreen')}
            >
              <MaterialIcons name="play-circle-outline" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Aulas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Cursos')}
            >
              <FontAwesome5 name="chalkboard-teacher" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Cursos</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Recolher' : 'Expandir'}
            </Text>
            <MaterialIcons
              name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="#2563eb"
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={[styles.grid, { marginTop: 20 }]}>
              <TouchableOpacity
                style={styles.gridCard}
                onPress={() => navigation.navigate('ConteudoScreen')}
              >
                <Feather name="book-open" size={24} color="#fff" />
                <Text style={styles.gridCardText}>Conteúdos extras</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridCard}>
                <FontAwesome5 name="trophy" size={24} color="#fff" />
                <Text style={styles.gridCardText}>Certificados</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}