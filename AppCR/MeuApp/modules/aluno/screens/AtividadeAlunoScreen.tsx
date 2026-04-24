import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/AtividadeAlunoStyles';
import { AtividadeAlunoCard } from '../components/AtividadeAlunoCard';
import { getAtividadesByDisciplina } from '../controllers/atividadeController';
import { IAtividade } from '../types';

export default function AtividadeAlunoScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAtividades = async () => {
    try {
      const data = await getAtividadesByDisciplina(disciplinaId);
      setAtividades(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAtividades(); }, [disciplinaId]);

  const handleOpenAtividade = (item: IAtividade) => {
    // No futuro, levar para uma tela de envio de resposta
    Alert.alert(item.titulo, "Aqui você poderá ver os detalhes e enviar sua resposta.");
  };

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }}>
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={headerColor} />
            <Text style={{ marginLeft: 5, color: headerColor, fontWeight: '600' }}>Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: headerColor }]}>Atividades</Text>
          <Text style={styles.subtitle}>{disciplinaNome}</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#10b981" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <AtividadeAlunoCard 
                item={item} 
                isLightTheme={isLightTheme} 
                onPress={handleOpenAtividade}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="clipboard-off-outline" size={60} color="#cbd5e1" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhuma atividade pendente.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}