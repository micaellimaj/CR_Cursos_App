import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity, Platform 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

import { AlunoFrequenciaCard } from '../components/AlunoFrequenciaCard';
import { getAlunosDaTurma } from '../controllers/turmaController';
import {
  registrarFrequencias, getFrequenciaPorTurma, excluirFrequencia
} from '../controllers/frequenciaController';

import { useAuth } from '../../../contexts/AuthContext';
import { IAlunoTurma, IFrequencia } from '../types';

export default function FrequenciaChamadaScreen({ route, navigation }: any) {
  const { turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const isLightTheme = theme === 'light';
  const globalStyles = getGlobalStyles(theme);

  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [historicoTotal, setHistoricoTotal] = useState<IFrequencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dataFiltroStr = date.toLocaleDateString('pt-BR');

  const loadData = async () => {
    setLoading(true);
    try {
      const [listaAlunos, listaFreq] = await Promise.all([
        getAlunosDaTurma(turmaId),
        getFrequenciaPorTurma(turmaId)
      ]);
      setAlunos(listaAlunos);
      setHistoricoTotal(listaFreq || []);
    } catch (e) { Alert.alert("Erro", "Falha ao carregar dados."); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [turmaId]);

  const getStats = (alunoId: string) => {
    const registros = historicoTotal.filter(f => f.aluno_id === alunoId);
    return { faltas: registros.filter(f => !f.status).length };
  };

  const handleRegistrar = async (alunoId: string, status: boolean) => {
    try {
      await registrarFrequencias({
        turma_id: turmaId,
        professor_id: user?.id || '',
        data: dataFiltroStr,
        alunos: [{ aluno_id: alunoId, status }]
      });
      loadData();
    } catch (e: any) { Alert.alert("Erro", e.message); }
  };

  const handleExcluir = async (id: string) => {
    try {
      await excluirFrequencia(id);
      loadData();
    } catch (e) { Alert.alert("Erro", "Erro ao remover."); }
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isLightTheme ? '#1e293b' : '#fff'} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.title, { color: isLightTheme ? '#1e293b' : '#fff' }]}>Chamada</Text>
            <Text style={styles.subtitle}>{turmaNome}</Text>
          </View>
        </View>

        {/* Seletor de Data */}
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)}
          style={{ 
            flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1,
            backgroundColor: isLightTheme ? '#fff' : '#1e293b',
            borderColor: isLightTheme ? '#e2e8f0' : '#334155', marginBottom: 20
          }}
        >
          <MaterialCommunityIcons name="calendar-search" size={24} color="#2563eb" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>Visualizando Data:</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#fff' }}>{dataFiltroStr}</Text>
          </View>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" 
            onChange={(e, d) => { setShowDatePicker(Platform.OS === 'ios'); if(d) setDate(d); }} 
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <FlatList 
            data={alunos} 
            keyExtractor={item => item.id!} 
            renderItem={({ item }) => (
              <AlunoFrequenciaCard 
                item={item}
                isLightTheme={isLightTheme}
                stats={getStats(item.id!)}
                registroNaData={historicoTotal.find(f => f.aluno_id === item.id && f.data === dataFiltroStr)}
                onRegistrar={handleRegistrar}
                onExcluir={handleExcluir}
              />
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}