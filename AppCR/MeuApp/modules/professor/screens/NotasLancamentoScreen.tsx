import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

import { getAlunosDaTurma } from '../controllers/turmaController';
import { criarNota, getNotasPorDisciplina, atualizarNota, deletarNota } from '../controllers/notaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IAlunoTurma, INota } from '../types';

export default function NotasLancamentoScreen({ route }: any) {
  const { disciplinaId, disciplinaNome, turmaId } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [notas, setNotas] = useState<INota[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estado para Edição
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNota, setSelectedNota] = useState<INota | null>(null);
  const [editValor, setEditValor] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [listaAlunos, listaNotas] = await Promise.all([
        getAlunosDaTurma(turmaId),
        getNotasPorDisciplina(disciplinaId)
      ]);
      setAlunos(listaAlunos);
      setNotas(listaNotas);
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar notas.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleCriar = async (alunoId: string, valor: string) => {
    if (!valor) return;
    try {
      await criarNota({
        alunoId, disciplinaId, turmaId,
        professorId: user?.id || '',
        valor: parseFloat(valor),
        descricao: "Nota de Avaliação"
      });
      loadData();
    } catch (e: any) { Alert.alert("Erro", e.message); }
  };

  const handleAtualizar = async () => {
    if (!selectedNota?.id) return;
    try {
      await atualizarNota(selectedNota.id, parseFloat(editValor));
      setModalVisible(false);
      loadData();
    } catch (e: any) { Alert.alert("Erro", "Falha ao atualizar."); }
  };

  const handleDeletar = (id: string) => {
    Alert.alert("Excluir", "Apagar nota definitivamente?", [
      { text: "Não" },
      { text: "Sim", onPress: async () => { await deletarNota(id); loadData(); } }
    ]);
  };

  const renderItem = ({ item }: { item: IAlunoTurma }) => {
    const notaExistente = notas.find(n => n.alunoId === item.id);

    return (
      <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{item.full_name}</Text>
          <Text style={styles.courseTag}>{notaExistente ? `Nota: ${notaExistente.valor}` : 'Sem nota lançada'}</Text>
        </View>

        {!notaExistente ? (
          <TextInput
            placeholder="0.0"
            keyboardType="numeric"
            style={{ width: 60, borderBottomWidth: 1, color: isLightTheme ? '#000' : '#fff', textAlign: 'center' }}
            onSubmitEditing={(e) => handleCriar(item.id!, e.nativeEvent.text)}
          />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { setSelectedNota(notaExistente); setEditValor(String(notaExistente.valor)); setModalVisible(true); }} style={{ marginRight: 15 }}>
              <MaterialCommunityIcons name="pencil-outline" size={26} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletar(notaExistente.id!)}>
              <MaterialCommunityIcons name="trash-can-outline" size={26} color="#dc2626" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>{disciplinaNome}</Text>
          <Text style={styles.subtitle}>Lançamento de Notas</Text>
        </View>

        {loading ? <ActivityIndicator size="large" color="#7c3aed" /> : (
          <FlatList data={alunos} keyExtractor={item => item.id!} renderItem={renderItem} />
        )}

        {/* Modal de Edição */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
            <View style={{ backgroundColor: isLightTheme ? '#fff' : '#1e293b', padding: 20, borderRadius: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: isLightTheme ? '#000' : '#fff' }}>Editar Nota</Text>
              <TextInput value={editValor} onChangeText={setEditValor} keyboardType="numeric" style={{ backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8, marginBottom: 20 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 20 }}><Text>Cancelar</Text></TouchableOpacity>
                <TouchableOpacity onPress={handleAtualizar}><Text style={{ fontWeight: 'bold', color: '#2563eb' }}>Salvar</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}