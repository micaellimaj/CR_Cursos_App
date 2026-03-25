import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

import { getAlunosDaTurma } from '../controllers/turmaController';
import { registrarChamada, getFrequenciaPorTurma, atualizarFrequencia, excluirFrequencia } from '../controllers/frequenciaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IAlunoTurma, IFrequencia } from '../types';

export default function FrequenciaChamadaScreen({ route }: any) {
  const { turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [historico, setHistorico] = useState<IFrequencia[]>([]);
  const [loading, setLoading] = useState(false);

  const dataHoje = new Date().toLocaleDateString('pt-BR');

  const loadData = async () => {
    setLoading(true);
    try {
      const [listaAlunos, listaFreq] = await Promise.all([
        getAlunosDaTurma(turmaId),
        getFrequenciaPorTurma(turmaId)
      ]);
      setAlunos(listaAlunos);
      setHistorico(listaFreq);
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar dados de frequência.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleRegistrar = async (alunoId: string, status: boolean) => {
    try {
      await registrarChamada({
        turma_id: turmaId,
        disciplina_id: route.params.disciplinaId || '', 
        professor_id: user?.id || '',
        data: dataHoje,
        alunos: [{ aluno_id: alunoId, status }]
      });
      loadData();
    } catch (e: any) { Alert.alert("Erro", e.message); }
  };

  const handleUpdate = async (id: string, statusAtual: boolean) => {
    try {
      await atualizarFrequencia(id, !statusAtual);
      loadData();
    } catch (e: any) { Alert.alert("Erro", "Erro ao atualizar."); }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Remover este registro?", [
      { text: "Cancelar" },
      { text: "Excluir", onPress: async () => { await excluirFrequencia(id); loadData(); } }
    ]);
  };

  const renderItem = ({ item }: { item: IAlunoTurma }) => {
    const registroHoje = historico.find(f => f.aluno_id === item.id && f.data === dataHoje);

    return (
      <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.full_name}</Text>
          <Text style={styles.courseTag}>{registroHoje ? `Status: ${registroHoje.status ? 'Presente' : 'Falta'}` : 'Pendente hoje'}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {!registroHoje ? (
            <>
              <TouchableOpacity onPress={() => handleRegistrar(item.id!, true)} style={{ marginRight: 15 }}>
                <MaterialCommunityIcons name="check-circle-outline" size={32} color="#059669" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRegistrar(item.id!, false)}>
                <MaterialCommunityIcons name="close-circle-outline" size={32} color="#dc2626" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => handleUpdate(registroHoje.id!, registroHoje.status)} style={{ marginRight: 15 }}>
                <MaterialCommunityIcons name="cached" size={28} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(registroHoje.id!)}>
                <MaterialCommunityIcons name="trash-can-outline" size={28} color="#dc2626" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Frequência: {turmaNome}</Text>
          <Text style={styles.subtitle}>Data: {dataHoje}</Text>
        </View>
        {loading ? <ActivityIndicator size="large" color="#059669" /> : (
          <FlatList data={alunos} keyExtractor={item => item.id!} renderItem={renderItem} />
        )}
      </View>
    </SafeAreaView>
  );
}