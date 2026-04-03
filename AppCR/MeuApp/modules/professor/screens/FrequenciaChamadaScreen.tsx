import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, SafeAreaView,
  ActivityIndicator, Alert, TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [historico, setHistorico] = useState<IFrequencia[]>([]);
  const [loading, setLoading] = useState(false);

  const dataHoje = new Date().toLocaleDateString('pt-BR');
  const mesmaData = (data1: string, data2: string) => data1 === data2;

  const loadData = async () => {
    setLoading(true);
    try {
      const [listaAlunos, listaFreq] = await Promise.all([
        getAlunosDaTurma(turmaId),
        getFrequenciaPorTurma(turmaId)
      ]);

      const alunosFormatados: IAlunoTurma[] = listaAlunos.map((aluno: any, index: number) => ({
        id: aluno.id || aluno.aluno_id || index.toString(),
        full_name: aluno.full_name || aluno.nome || "Sem nome",
        email: aluno.email || "",
        data_nascimento: aluno.data_nascimento || "",
        turma_id: aluno.turma_id || turmaId
      }));

      setAlunos(alunosFormatados);
      setHistorico(listaFreq || []);
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [turmaId]);

  const handleRegistrar = async (alunoId: string, status: boolean) => {
    try {
      const payload = {
        turma_id: turmaId,
        professor_id: user?.id || '',
        data: dataHoje,
        alunos: [{ aluno_id: alunoId, status }]
      };
      await registrarFrequencias(payload);
      loadData();
    } catch (e: any) {
      Alert.alert("Erro", e.message);
    }
  };

  const handleUpdate = async (id: string, statusAtual: boolean) => {
    try {
      await atualizarFrequencia(id, !statusAtual);
      loadData();
    } catch {
      Alert.alert("Erro", "Erro ao atualizar.");
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Remover este registro?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: async () => {
          await excluirFrequencia(id);
          loadData();
        }
      }
    ]);
  };

  const renderItem = ({ item }: { item: IAlunoTurma }) => {
    const registroHoje = historico.find(
      f => f.aluno_id === item.id && mesmaData(f.data, dataHoje)
    );

    return (
      <View style={[
        styles.subjectCard,
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          elevation: 0,
          shadowOpacity: 0,
          borderWidth: 1,
          borderColor: isLightTheme ? '#e2e8f0' : '#334155',
          padding: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center'
        }
      ]}>
        <View style={{ flex: 1 }}>
          <Text style={[
            styles.subjectName,
            { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 15, fontWeight: '600' }
          ]}>
            {item.full_name}
          </Text>

          <Text style={{ 
            fontSize: 12, 
            marginTop: 4, 
            color: registroHoje ? (registroHoje.status ? '#059669' : '#dc2626') : '#94a3b8',
            fontWeight: registroHoje ? 'bold' : '400'
          }}>
            {registroHoje
              ? `Status: ${registroHoje.status ? 'Presente' : 'Falta'}`
              : 'Pendente hoje'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!registroHoje ? (
            <>
              <TouchableOpacity
                onPress={() => handleRegistrar(item.id!, true)}
                style={{ padding: 5, marginRight: 10 }}
              >
                <MaterialCommunityIcons name="check-circle" size={34} color="#059669" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRegistrar(item.id!, false)}
                style={{ padding: 5 }}
              >
                <MaterialCommunityIcons name="close-circle" size={34} color="#dc2626" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => handleUpdate(registroHoje.id!, registroHoje.status)}
                style={{ padding: 8, marginRight: 6 }}
              >
                <MaterialCommunityIcons name="cached" size={26} color="#2563eb" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(registroHoje.id!)}
                style={{ padding: 8 }}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={26} color="#dc2626" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[
      globalStyles.container,
      { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }
    ]}>
      <View style={styles.content}>

        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={isLightTheme ? '#1e293b' : '#fff'} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: isLightTheme ? '#1e293b' : '#fff' }]}>Chamada</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{turmaNome}</Text>
            </View>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: isLightTheme ? '#fff' : '#1e293b',
            padding: 14, 
            borderRadius: 12, 
            borderWidth: 1,
            borderColor: isLightTheme ? '#e2e8f0' : '#334155'
          }}>
            <MaterialCommunityIcons name="calendar-check" size={22} color="#2563eb" style={{ marginRight: 10 }} />
            <View>
              <Text style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase' }}>Data do Registro</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#fff' }}>{dataHoje}</Text>
            </View>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <MaterialCommunityIcons name="account-search-outline" size={48} color="#94a3b8" />
                <Text style={{ color: '#94a3b8', marginTop: 10 }}>Nenhum aluno encontrado</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}