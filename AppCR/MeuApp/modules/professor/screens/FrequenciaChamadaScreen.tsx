import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, FlatList, SafeAreaView,
  ActivityIndicator, Alert, TouchableOpacity, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

import { getAlunosDaTurma } from '../controllers/turmaController';
import {
  registrarFrequencias,
  getFrequenciaPorTurma,
  atualizarFrequencia,
  excluirFrequencia
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
  
  // Estado para a data selecionada no filtro
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
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [turmaId]);

  // Função para calcular a porcentagem ou total de faltas do aluno no histórico
  const getEstatisticaAluno = (alunoId: string) => {
    const registros = historicoTotal.filter(f => f.aluno_id === alunoId);
    const presencas = registros.filter(f => f.status).length;
    return { total: registros.length, presencas, faltas: registros.length - presencas };
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleRegistrar = async (alunoId: string, status: boolean) => {
    try {
      const payload = {
        turma_id: turmaId,
        professor_id: user?.id || '',
        data: dataFiltroStr, // Registra na data que está selecionada no filtro
        alunos: [{ aluno_id: alunoId, status }]
      };
      await registrarFrequencias(payload);
      loadData();
    } catch (e: any) { Alert.alert("Erro", e.message); }
  };

  const renderItem = ({ item }: { item: IAlunoTurma }) => {
    const registroNaData = historicoTotal.find(
      f => f.aluno_id === item.id && f.data === dataFiltroStr
    );
    const stats = getEstatisticaAluno(item.id!);

    return (
      <View style={[
        styles.subjectCard,
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          borderWidth: 1,
          borderColor: isLightTheme ? '#e2e8f0' : '#334155',
          elevation: 0, padding: 16, marginBottom: 12, borderRadius: 12
        }
      ]}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: isLightTheme ? '#1e293b' : '#fff', fontSize: 15, fontWeight: 'bold' }}>
            {item.full_name}
          </Text>
          
          {/* Indicador de histórico rápido */}
          <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#f1f5f9', paddingHorizontal: 6, borderRadius: 4, marginRight: 8 }}>
               <Text style={{ fontSize: 10, color: '#64748b' }}>Histórico: {stats.faltas} faltas</Text>
            </View>
            <Text style={{ 
              fontSize: 12, 
              color: registroNaData ? (registroNaData.status ? '#059669' : '#dc2626') : '#94a3b8',
              fontWeight: '600'
            }}>
              {registroNaData ? (registroNaData.status ? '● Presente' : '● Falta') : '○ Pendente'}
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!registroNaData ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleRegistrar(item.id!, true)} style={{ marginRight: 10 }}>
                <MaterialCommunityIcons name="check-circle-outline" size={32} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRegistrar(item.id!, false)}>
                <MaterialCommunityIcons name="close-circle-outline" size={32} color="#dc2626" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              onPress={() => {
                Alert.alert("Alterar", "Deseja excluir este registro?", [
                  { text: "Cancelar" },
                  { text: "Excluir", onPress: () => { excluirFrequencia(registroNaData.id!); loadData(); }, style: 'destructive' }
                ])
              }}
              style={{ backgroundColor: registroNaData.status ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)', padding: 8, borderRadius: 8 }}
            >
              <MaterialCommunityIcons 
                name={registroNaData.status ? "check-bold" : "close-thick"} 
                size={22} 
                color={registroNaData.status ? "#059669" : "#dc2626"} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Header com Botão Voltar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isLightTheme ? '#1e293b' : '#fff'} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.title, { color: isLightTheme ? '#1e293b' : '#fff' }]}>Chamada</Text>
            <Text style={styles.subtitle}>{turmaNome}</Text>
          </View>
        </View>

        {/* Seletor de Data (Filtro) */}
        <TouchableOpacity 
          onPress={() => setShowDatePicker(true)}
          style={{ 
            flexDirection: 'row', alignItems: 'center', 
            backgroundColor: isLightTheme ? '#fff' : '#1e293b',
            padding: 16, borderRadius: 12, borderWidth: 1,
            borderColor: isLightTheme ? '#e2e8f0' : '#334155',
            marginBottom: 20
          }}
        >
          <MaterialCommunityIcons name="calendar-search" size={24} color="#2563eb" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>Visualizando Data:</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#fff' }}>
              {dataFiltroStr}
            </Text>
          </View>
          <MaterialCommunityIcons name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <FlatList 
            data={alunos} 
            keyExtractor={item => item.id || Math.random().toString()} 
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}