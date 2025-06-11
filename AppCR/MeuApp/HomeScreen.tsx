import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';
import styles from './styles/HomeScreenStyles'; // Importando os estilos
import { FontAwesome5, MaterialIcons, Feather } from '@expo/vector-icons'; // Ícones

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  const [isExpanded, setIsExpanded] = useState(false);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

  // Exemplo de fetch da foto do usuário no Firebase
  useEffect(() => {
    // Substitua pelo seu método real de buscar o usuário logado e sua foto
    // Exemplo com Firebase Auth + Firestore:
    /*
    import { auth, firestore } from './firebaseConfig';
    const userId = auth.currentUser?.uid;
    if (userId) {
      firestore.collection('usuarios').doc(userId).get().then(doc => {
        if (doc.exists) {
          setUserPhotoUrl(doc.data().photoUrl);
        }
      });
    }
    */
    // Simulação:
    setTimeout(() => {
      setUserPhotoUrl('https://randomuser.me/api/portraits/men/32.jpg'); // Exemplo de URL
    }, 500);
  }, []);

  return (
    <View style={globalStyles.container}>
      {/* Topo com boas-vindas */}
      <View style={[globalStyles.header, styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
        {/* Parte esquerda: Nome e curso */}
        <View style={{ flex: 1 }}>
          <Text style={globalStyles.headerTitle}>Olá, Matheus Feliciano</Text>
        </View>

        {/* Parte direita: Foto do usuário com sino acoplado acima */}
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
              elevation: 2, // sombra Android
              shadowColor: '#000', // sombra iOS
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 2,
            }}>
              <MaterialIcons name="notifications-none" size={22} color="#2563eb" />
            </TouchableOpacity>
            {userPhotoUrl ? (
              <Image
                source={{ uri: userPhotoUrl }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require('./assets/aluno.png')}
                style={styles.avatar}
              />
            )}
          </View>
        </View>
      </View>

      {/* Seção de "Meu curso" */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={styles.sectionTitle}>Disciplina em andamento</Text>

        {/* Card clicável */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('TelaConteudos')} // Redireciona para TelaConteudos
        >
          <Text style={styles.subtitle}>Continuar estudando...</Text>
          <Text style={styles.cardTitle}>Módulo 1 - Sistemas Operacionais</Text>
        </TouchableOpacity>

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
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Notas')}
            >
              <MaterialIcons name="insert-chart-outlined" size={26} color="#fff" />
              <Text style={styles.gridCardText}>Notas e histórico</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.grid, { marginTop: 20 }]}>
            {/* Grid "Aulas" */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('AulasScreen')} // Redireciona para AulasScreen
            >
              <MaterialIcons name="play-circle-outline" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Aulas</Text>
            </TouchableOpacity>

            {/* Grid "Cursos" */}
            <TouchableOpacity
              style={styles.gridCard}
              onPress={() => navigation.navigate('Cursos')} // Navega para a tela Cursos
            >
              <FontAwesome5 name="chalkboard-teacher" size={24} color="#fff" />
              <Text style={styles.gridCardText}>Cursos</Text>
            </TouchableOpacity>
          </View>

          {/* Botão de expandir/recolher */}
          <TouchableOpacity
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)} // Alterna o estado
          >
            <Text style={styles.expandButtonText}>
              {isExpanded ? 'Recolher' : 'Expandir'} {/* Texto dinâmico */}
            </Text>
            <MaterialIcons
              name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} // Ícone dinâmico
              size={24}
              color="#2563eb"
            />
          </TouchableOpacity>

          {/* Grid "Aulas" e "Cursos" */}
          {isExpanded && (
            <View style={[styles.grid, { marginTop: 20 }]}>
              {/* Conteúdos extras */}
              <TouchableOpacity
                style={styles.gridCard}
                onPress={() => navigation.navigate('ConteudoScreen')}
              >
                <Feather name="book-open" size={24} color="#fff" />
                <Text style={styles.gridCardText}>Conteúdos extras</Text>
              </TouchableOpacity>

              {/* Certificados */}
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