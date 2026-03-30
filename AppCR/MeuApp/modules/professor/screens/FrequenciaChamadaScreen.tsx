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

export default function FrequenciaChamadaScreen({ route }: any) {

  const { turmaId, turmaNome, disciplinaId } = route.params;

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

      // ✅ normaliza alunos
      const alunosFormatados: IAlunoTurma[] = listaAlunos.map((aluno: any, index: number) => ({
        id: aluno.id || aluno.aluno_id || index.toString(),
        full_name: aluno.full_name || aluno.nome || "Sem nome",
        email: aluno.email || "",
        data_nascimento: aluno.data_nascimento || "",
        turma_id: aluno.turma_id || turmaId
      }));

     

      setAlunos(alunosFormatados);

      console.log("TURMA ID:", turmaId);
      console.log("DISCIPLINA ID:", disciplinaId);

    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [turmaId]);

  // ✅ REGISTRAR
  const handleRegistrar = async (alunoId: string, status: boolean) => {
    try {

      // ✅ ID corrigido
      const id = `${Date.now()}_${alunoId}`;

      const payload = {
        [id]: {
          aluno_id: alunoId,
          turma_id: turmaId,
          professor_id: user?.id || '',
          data: dataHoje,
          status
        }
      };

      await registrarFrequencias(payload);

      loadData();

    } catch (e: any) {
      Alert.alert("Erro", e.message);
    }
  };

  // ✅ UPDATE
  const handleUpdate = async (id: string, statusAtual: boolean) => {
    try {
      await atualizarFrequencia(id, !statusAtual);
      loadData();
    } catch {
      Alert.alert("Erro", "Erro ao atualizar.");
    }
  };

  // ✅ DELETE
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
      f =>
        f.aluno_id === item.id &&
        mesmaData(f.data, dataHoje)
    );

    return (
      <View style={[
        styles.subjectCard,
        { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }
      ]}>

        <View style={{ flex: 1 }}>
          <Text style={[
            styles.subjectName,
            { color: isLightTheme ? '#1e293b' : '#fff' }
          ]}>
            {item.full_name}
          </Text>

          <Text style={styles.courseTag}>
            {registroHoje
              ? `Status: ${registroHoje.status ? 'Presente' : 'Falta'}`
              : 'Pendente hoje'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {!registroHoje ? (
            <>
              <TouchableOpacity
                onPress={() => handleRegistrar(item.id!, true)}
                style={{ marginRight: 15 }}
              >
                <MaterialCommunityIcons name="check-circle-outline" size={32} color="#059669" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleRegistrar(item.id!, false)}
              >
                <MaterialCommunityIcons name="close-circle-outline" size={32} color="#dc2626" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => handleUpdate(registroHoje.id!, registroHoje.status)}
                style={{ marginRight: 15 }}
              >
                <MaterialCommunityIcons name="cached" size={28} color="#2563eb" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDelete(registroHoje.id!)}
              >
                <MaterialCommunityIcons name="trash-can-outline" size={28} color="#dc2626" />
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
      { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }
    ]}>
      <View style={styles.content}>

        <View style={styles.headerSection}>
          <Text style={[
            styles.title,
            { color: isLightTheme ? '#1e3a8a' : '#fff' }
          ]}>
            Frequência: {turmaNome}
          </Text>

          <Text style={styles.subtitle}>
            Data: {dataHoje}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#059669" />
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item, index) => item.id ?? index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                Nenhum aluno encontrado
              </Text>
            }
          />
        )}

      </View>
    </SafeAreaView>
  );
}