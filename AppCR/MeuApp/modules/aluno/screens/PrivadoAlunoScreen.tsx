import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import { getPrivadoAlunoStyles } from '../styles/PrivadoAlunoStyles';
import { PrivadoAlunoCard } from '../components/PrivadoAlunoCard';
import { getConteudoPrivadoByAluno } from '../controllers/privadoController';
import { getTurmaByAlunoId } from '../controllers/turmaController';
import { IPrivado, ITurmaAluno } from '../types';

export default function PrivadoAlunoScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const styles = getPrivadoAlunoStyles(theme);

  const [mensagens, setMensagens] = useState<IPrivado[]>([]);
  const [minhaTurma, setMinhaTurma] = useState<ITurmaAluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    if (!user?.id) return;
    try {

      const [dataMensagens, dataTurma] = await Promise.all([
        getConteudoPrivadoByAluno(user.id),
        getTurmaByAlunoId(user.id)
      ]);

      setMinhaTurma(dataTurma);
      setMensagens(dataMensagens.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      ));
    } catch (e) {
      console.log("Erro ao carregar dados:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { loadData(); }, [user?.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#f8fafc' : '#0f172a' }}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Privado</Text>
          <Text style={styles.subtitle}>Mensagens e feedbacks exclusivos para você.</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={mensagens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PrivadoAlunoCard 
                item={item} 
                theme={theme} 
                nomeTurma={item.turma_id === minhaTurma?.id ? minhaTurma.nome : "Geral"} 
              />
            )}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={() => { setRefreshing(true); loadData(); }} 
                tintColor="#2563eb" 
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Feather name="message-square" size={50} color="#94a3b8" />
                <Text style={styles.emptyText}>Nenhuma mensagem privada enviada ainda.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}