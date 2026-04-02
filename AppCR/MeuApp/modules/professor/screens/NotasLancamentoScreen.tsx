import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, 
  Alert, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

// Controllers e Tipagens
import { getAlunosDaTurma } from '../controllers/turmaController';
import { criarNota, getNotasPorDisciplina, atualizarNota, deletarNota } from '../controllers/notaController';
import { getMyDisciplinas } from '../controllers/disciplinaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IAlunoTurma, INota, IDisciplinaProfessor } from '../types';

export default function NotasLancamentoScreen({ route, navigation }: any) {
  const { turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const { user } = useAuth();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados de Dados
  const [disciplinas, setDisciplinas] = useState<IDisciplinaProfessor[]>([]);
  const [selectedDisciplina, setSelectedDisciplina] = useState<{id: string, nome: string} | null>(null);
  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [notas, setNotas] = useState<INota[]>([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [inputValue, setInputValue] = useState<Record<string, string>>({});
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [selectedNota, setSelectedNota] = useState<INota | null>(null);
  const [editValor, setEditValor] = useState('');

  // Carrega lista de disciplinas do professor
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const listaDisc = await getMyDisciplinas(user?.id);
      setDisciplinas(listaDisc);
      
      // Prioriza a disciplina vinda da navegação, senão seleciona a primeira da lista
      if (route.params?.disciplinaId) {
        setSelectedDisciplina({ 
          id: route.params.disciplinaId, 
          nome: route.params.disciplinaNome 
        });
      } else if (listaDisc.length > 0) {
        setSelectedDisciplina({ id: listaDisc[0].id, nome: listaDisc[0].nome });
      }
    } catch (e: any) {
      Alert.alert("Erro", e.message || "Falha ao carregar disciplinas.");
    } finally { setLoading(false); }
  };

  // Carrega alunos e notas sempre que mudar a disciplina ou turma
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
      Alert.alert("Erro", "Falha ao carregar notas dos alunos.");
    } finally { setLoading(false); }
  };

  useEffect(() => { loadInitialData(); }, []);
  useEffect(() => { loadAlunosENotas(); }, [selectedDisciplina]);

  const handleCriar = async (alunoId: string) => {
    if (!selectedDisciplina) return Alert.alert("Aviso", "Selecione uma disciplina primeiro.");
    const valor = inputValue[alunoId];
    if (!valor || isNaN(parseFloat(valor))) return Alert.alert("Aviso", "Insira um valor numérico.");

    try {
      await criarNota({
        alunoId,
        disciplinaId: selectedDisciplina.id,
        turmaId,
        professorId: user?.id || '',
        valor: parseFloat(valor),
        descricao: `Nota: ${selectedDisciplina.nome}`
      });
      setInputValue({ ...inputValue, [alunoId]: '' });
      loadAlunosENotas();
    } catch (e: any) { Alert.alert("Erro", e.message); }
  };

  const handleAtualizar = async () => {
    if (!selectedNota?.id) return;
    try {
      await atualizarNota(selectedNota.id, parseFloat(editValor), selectedNota.descricao);
      setModalEditVisible(false);
      loadAlunosENotas();
    } catch (e: any) { Alert.alert("Erro", "Falha ao atualizar nota."); }
  };

  const handleDeletar = (id: string) => {
    Alert.alert("Excluir", "Deseja apagar esta nota definitivamente?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => { 
          await deletarNota(id); 
          loadAlunosENotas(); 
      }}
    ]);
  };

  const renderItem = ({ item }: { item: IAlunoTurma }) => {
    const notaExistente = notas.find(n => n.alunoId === item.id);

    return (
      <View style={[styles.subjectCard, { 
        backgroundColor: isLightTheme ? '#fff' : '#1e293b',
        alignItems: 'center',
        paddingVertical: 14 
      }]}>
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
            {item.full_name}
          </Text>
          <Text style={[styles.courseTag, { color: notaExistente ? '#059669' : '#64748b' }]}>
            {notaExistente ? `Nota Atual: ${notaExistente.valor || notaExistente.nota}` : 'Sem nota lançada'}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
          {!notaExistente ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                placeholder="0.0"
                placeholderTextColor="#94a3b8"
                keyboardType="numeric"
                value={inputValue[item.id!] || ''}
                onChangeText={(v) => setInputValue({...inputValue, [item.id!]: v})}
                style={{ 
                  width: 55, 
                  height: 40,
                  borderWidth: 1, 
                  borderColor: isLightTheme ? '#cbd5e1' : '#475569',
                  borderRadius: 8,
                  color: isLightTheme ? '#000' : '#fff', 
                  textAlign: 'center',
                  marginRight: 8,
                  backgroundColor: isLightTheme ? '#fff' : '#0f172a'
                }}
              />
              <TouchableOpacity onPress={() => handleCriar(item.id!)}>
                <MaterialCommunityIcons name="check-circle" size={34} color="#059669" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity 
                onPress={() => { 
                  setSelectedNota(notaExistente); 
                  setEditValor(String(notaExistente.valor || notaExistente.nota)); 
                  setModalEditVisible(true); 
                }} 
                style={{ padding: 8, marginRight: 5 }}
              >
                <MaterialCommunityIcons name="pencil-outline" size={24} color="#2563eb" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletar(notaExistente.id!)} style={{ padding: 8 }}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="#dc2626" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Header com Seletor de Disciplina */}
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
              <MaterialCommunityIcons name="arrow-left" size={28} color={isLightTheme ? '#1e3a8a' : '#fff'} />
            </TouchableOpacity>
            <View>
              <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>Lançamento</Text>
              <Text style={styles.subtitle}>Turma: {turmaNome}</Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => setShowDiscModal(true)}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: isLightTheme ? '#fff' : '#1e293b',
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isLightTheme ? '#e2e8f0' : '#334155',
              elevation: 2
            }}
          >
            <MaterialCommunityIcons name="book-open-variant" size={20} color="#059669" style={{ marginRight: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase' }}>Disciplina</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: isLightTheme ? '#1e293b' : '#fff' }}>
                {selectedDisciplina?.nome || "Escolha uma disciplina"}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-down" size={22} color="#64748b" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#059669" style={{ marginTop: 40 }} />
        ) : (
          <FlatList 
            data={alunos} 
            keyExtractor={item => item.id || Math.random().toString()} 
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Modal: Seleção de Disciplina */}
        <Modal visible={showDiscModal} transparent animationType="fade">
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}>
            <View style={{ backgroundColor: isLightTheme ? '#fff' : '#1e293b', borderRadius: 20, padding: 20, maxHeight: '70%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: isLightTheme ? '#1e293b' : '#fff', textAlign: 'center' }}>
                Selecionar Disciplina
              </Text>
              <ScrollView showsVerticalScrollIndicator={false}>
                {disciplinas.map((d) => (
                  <TouchableOpacity 
                    key={d.id} 
                    onPress={() => { setSelectedDisciplina({id: d.id, nome: d.nome}); setShowDiscModal(false); }}
                    style={{ 
                      paddingVertical: 15, 
                      borderBottomWidth: 1, 
                      borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{ fontSize: 16, color: isLightTheme ? '#334155' : '#cbd5e1' }}>{d.nome}</Text>
                    {selectedDisciplina?.id === d.id && <MaterialCommunityIcons name="check" size={20} color="#059669" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setShowDiscModal(false)} style={{ marginTop: 20, alignItems: 'center', backgroundColor: '#f1f5f9', padding: 12, borderRadius: 10 }}>
                <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal: Edição de Nota */}
        <Modal visible={modalEditVisible} transparent animationType="fade">
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 20 }}
          >
            <View style={{ backgroundColor: isLightTheme ? '#fff' : '#1e293b', padding: 25, borderRadius: 20 }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 20, color: isLightTheme ? '#1e293b' : '#fff', textAlign: 'center' }}>
                Editar Nota
              </Text>
              <TextInput 
                value={editValor} 
                onChangeText={setEditValor} 
                keyboardType="numeric" 
                autoFocus
                style={{ 
                  backgroundColor: isLightTheme ? '#f1f5f9' : '#334155', 
                  padding: 15, borderRadius: 12, marginBottom: 25,
                  fontSize: 22, textAlign: 'center', color: isLightTheme ? '#000' : '#fff', fontWeight: 'bold'
                }} 
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setModalEditVisible(false)} style={{ flex: 1, padding: 15, alignItems: 'center' }}>
                  <Text style={{ color: '#64748b', fontWeight: '600' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAtualizar} style={{ flex: 1, backgroundColor: '#2563eb', padding: 15, borderRadius: 12, alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', color: '#fff' }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

      </View>
    </SafeAreaView>
  );
}