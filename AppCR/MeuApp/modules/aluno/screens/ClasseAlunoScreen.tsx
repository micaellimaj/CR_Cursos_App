import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, ActivityIndicator, SafeAreaView, Alert, TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { useAuth } from '../../../contexts/AuthContext';

import styles from '../styles/ClasseAlunoStyles';
import { ClasseAlunoCard } from '../components/ClasseAlunoCard';
import { getClassesByTurma } from '../controllers/classeController';
import { getTurmaByAlunoId } from '../controllers/turmaController'; // Novo controller
import { IClasse, IAluno, ITurmaAluno } from '../types';

export default function ClasseAlunoScreen() {
  const { user } = useAuth();
  const aluno = user as unknown as IAluno;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [posts, setPosts] = useState<IClasse[]>([]);
  const [loading, setLoading] = useState(false);
  const [turmaInfo, setTurmaInfo] = useState<ITurmaAluno | null>(null);

  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  const loadInitialData = async () => {
  if (!user?.id) return;

  setLoading(true);
  try {
    const dadosTurma = await getTurmaByAlunoId(user.id);
    setTurmaInfo(dadosTurma);

    const mural = await getClassesByTurma(dadosTurma.id);
    setPosts(mural);
    
  } catch (error) {
    console.log("Erro ao identificar turma automaticamente:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadInitialData();
  }, [aluno?.turma_id]);

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: textColor }]}>Mural da Classe</Text>
        </View>

        {/* Card informativo da Turma Logada */}
        <View style={{ 
          padding: 16, backgroundColor: cardBg, borderRadius: 16, marginBottom: 20,
          borderWidth: 1, borderColor: borderColor, flexDirection: 'row', alignItems: 'center',
        }}>
          <View style={{ width: 30, height: 20, borderRadius: 10, backgroundColor: '#2563eb15', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
             <MaterialCommunityIcons name="google-classroom" size={20} color="#2563eb" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: 'bold' }}>MINHA TURMA</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>
              {turmaInfo ? turmaInfo.nome : "Carregando..."}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ClasseAlunoCard 
                item={item}
                textColor={textColor}
                cardBg={cardBg}
                borderColor={borderColor}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="post-outline" size={80} color="#cbd5e1" />
                <Text style={styles.emptyText}>Nenhuma postagem encontrada para sua turma.</Text>
              </View>
            }
            onRefresh={loadInitialData}
            refreshing={loading}
          />
        )}
      </View>
    </SafeAreaView>
  );
}