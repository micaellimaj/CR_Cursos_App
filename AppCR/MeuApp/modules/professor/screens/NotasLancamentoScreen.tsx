import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, 
  Alert, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { AlunoNotaCard } from '../components/AlunoNotaCard';
import styles from '../styles/MyTurmasStyles';

import { getAlunosDaTurma } from '../controllers/turmaController';
import { criarNota, getNotasPorDisciplina, atualizarNota, deletarNota } from '../controllers/notaController';
import { getMyDisciplinas } from '../controllers/disciplinaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IAlunoTurma, INota, IDisciplinaProfessor } from '../types';

export default function NotasLancamentoScreen({ route, navigation }: any) {
  const { turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const isLightTheme = theme === 'light';
  const globalStyles = getGlobalStyles(theme);

  const [disciplinas, setDisciplinas] = useState<IDisciplinaProfessor[]>([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState<{id: string, nome: string} | null>(null);
  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [notas, setNotas] = useState<INota[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [inputValue, setInputValue] = useState<Record<string, string>>({});
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedNota, setSelectedNota] = useState<INota | null>(null);
  const [editValor, setEditValor] = useState('');

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const listaDisc = await getMyDisciplinas(user?.id);
      setDisciplinas(listaDisc);
      
      const discInicial = route.params?.disciplinaId 
        ? { id: route.params.disciplinaId, nome: route.params.disciplinaNome }
        : listaDisc.length > 0 ? { id: listaDisc[0].id, nome: listaDisc[0].nome } : null;
      
      setSelectedDisciplina(discInicial);
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar disciplinas.");
    } finally {
      setLoading(false);
    }
  };

  const loadAlunosENotas = async () => {
    if (!selectedDisciplina) return;
    setLoading(true);
    try {
      const [listaAlunos, listaNotas] = await Promise.all([
        getAlunosDaTurma(turmaId),
        getNotasPorDisciplina(selectedDisciplina.id)
      ]);
      setAlunos(listaAlunos);
      setNotas(listaNotas);
    } catch (e) {
      Alert.alert("Erro", "Falha ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadInitialData(); }, []);
  useEffect(() => { loadAlunosENotas(); }, [selectedDisciplina]);

  const handleCriar = async (alunoId: string) => {
    const valor = inputValue[alunoId];
    if (!valor) return Alert.alert("Aviso", "Insira a nota.");
    try {
      await criarNota({
        alunoId,
        disciplinaId: selectedDisciplina?.id || '',
        turmaId,
        professorId: user?.id || '',
        valor: parseFloat(valor.replace(',', '.')),
        descricao: `Nota: ${selectedDisciplina?.nome}`
      });
      setInputValue({ ...inputValue, [alunoId]: '' });
      loadAlunosENotas();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  };

  const handleAtualizar = async () => {
    if (!selectedNota?.id) return;
    try {
      await atualizarNota(selectedNota.id, parseFloat(editValor.replace(',', '.')), selectedNota.descricao);
      setModalEditVisible(false);
      loadAlunosENotas();
    } catch (e) {
      Alert.alert("Erro", "Falha ao atualizar.");
    }
  };

  const handleConfirmDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja apagar esta nota permanentemente?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
          await deletarNota(id);
          loadAlunosENotas();
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={isLightTheme ? '#1e293b' : '#fff'} />
            </TouchableOpacity>
            <View>
              <Text style={[styles.title, { color: isLightTheme ? '#1e293b' : '#fff' }]}>Lançamento</Text>
              <Text style={styles.subtitle}>Turma {turmaNome}</Text>
            </View>
          </View>

          {/* Seletor de Disciplina */}
          <TouchableOpacity 
            onPress={() => setShowDiscModal(true)}
            style={{ 
              flexDirection: 'row', alignItems: 'center', 
              backgroundColor: isLightTheme ? '#fff' : '#1e293b',
              padding: 16, borderRadius: 12, borderWidth: 1,
              borderColor: isLightTheme ? '#e2e8f0' : '#334155'
            }}
          >
            <MaterialCommunityIcons name="book-open-outline" size={22} color="#2563eb" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>Disciplina</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#fff' }}>
                {selectedDisciplina?.nome || "Escolha uma..."}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={22} color="#64748b" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : (
          <FlatList 
            data={alunos} 
            keyExtractor={item => item.id!} 
            renderItem={({ item }) => (
              <AlunoNotaCard 
                item={item}
                isLightTheme={isLightTheme}
                notaExistente={notas.find(n => n.alunoId === item.id)}
                inputValue={inputValue[item.id!] || ''}
                onInputChange={(v) => setInputValue({...inputValue, [item.id!]: v})}
                onCriar={() => handleCriar(item.id!)}
                onEdit={(nota) => { 
                  setSelectedNota(nota); 
                  setEditValor(String(nota.valor || nota.nota)); 
                  setModalEditVisible(true); 
                }}
                onDelete={handleConfirmDelete}
              />
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Modal Selecionar Disciplina */}
        <Modal visible={showDiscModal} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 25 }}>
            <View style={{ backgroundColor: isLightTheme ? '#fff' : '#1e293b', borderRadius: 20, padding: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: isLightTheme ? '#1e293b' : '#fff', textAlign: 'center' }}>
                Selecionar Disciplina
              </Text>
              <ScrollView style={{ maxHeight: 300 }}>
                {disciplinas.map((d) => (
                  <TouchableOpacity 
                    key={d.id} 
                    onPress={() => { setSelectedDisciplina({id: d.id, nome: d.nome}); setShowDiscModal(false); }}
                    style={{ 
                      paddingVertical: 15, 
                      borderBottomWidth: 1, 
                      borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155' 
                    }}
                  >
                    <Text style={{ 
                      fontSize: 16, 
                      color: selectedDisciplina?.id === d.id ? '#2563eb' : (isLightTheme ? '#334155' : '#cbd5e1'),
                      fontWeight: selectedDisciplina?.id === d.id ? 'bold' : '400' 
                    }}>
                      {d.nome}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setShowDiscModal(false)} style={{ marginTop: 20, padding: 15, backgroundColor: isLightTheme ? '#f1f5f9' : '#0f172a', borderRadius: 10, alignItems: 'center' }}>
                <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal Editar Nota */}
        <Modal visible={modalEditVisible} transparent animationType="fade">
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', padding: 30 }}>
            <View style={{ backgroundColor: isLightTheme ? '#fff' : '#1e293b', padding: 25, borderRadius: 20 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20, color: isLightTheme ? '#1e293b' : '#fff', textAlign: 'center' }}>Editar Nota</Text>
              <TextInput 
                value={editValor} 
                onChangeText={setEditValor} 
                keyboardType="numeric" 
                autoFocus
                style={{ 
                  backgroundColor: isLightTheme ? '#f1f5f9' : '#334155', padding: 15, borderRadius: 12, marginBottom: 20,
                  fontSize: 26, textAlign: 'center', color: isLightTheme ? '#1e293b' : '#fff', fontWeight: 'bold'
                }} 
              />
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => setModalEditVisible(false)} style={{ flex: 1, padding: 15, alignItems: 'center' }}>
                  <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAtualizar} style={{ flex: 1, backgroundColor: '#2563eb', padding: 15, borderRadius: 12, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </View>
    </SafeAreaView>
  );
}