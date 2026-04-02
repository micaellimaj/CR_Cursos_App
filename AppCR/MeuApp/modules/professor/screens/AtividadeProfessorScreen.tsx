import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Modal, Alert, 
  ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import { FormInput } from '../../admin/components/FormInput'; 
import styles from '../styles/AtividadeStyles';

import { 
  getAtividadesByDisciplina, 
  createAtividade, 
  updateAtividade, 
  deleteAtividade 
} from '../controllers/atividadeController';
import { getMyDisciplinas } from '../controllers/disciplinaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IAtividade, TAtividadeTipo, IDisciplinaProfessor } from '../types';

export default function AtividadeProfessorScreen({ route }: any) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  // Estados de Dados
  const [disciplinas, setDisciplinas] = useState<IDisciplinaProfessor[]>([]);
  const [selectedDisc, setSelectedDisc] = useState<{id: string, nome: string} | null>(null);
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDiscModal, setShowDiscModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'texto' as TAtividadeTipo,
    conteudoTexto: '',
    dataEntrega: '',
    arquivo: null as any
  });

  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const inputBg = isLightTheme ? '#f1f5f9' : '#0f172a';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  // Carregamento Inicial
  const loadInitialData = async () => {
    try {
      const lista = await getMyDisciplinas(user?.id);
      setDisciplinas(lista);
      
      // Se veio via parâmetro de rota (navegação direta), seleciona
      if (route.params?.disciplinaId) {
        setSelectedDisc({ id: route.params.disciplinaId, nome: route.params.disciplinaNome });
      } else if (lista.length > 0) {
        setSelectedDisc({ id: lista[0].id, nome: lista[0].nome });
      }
    } catch (e) { Alert.alert("Erro", "Falha ao carregar disciplinas."); }
  };

  const fetchAtividades = async () => {
    if (!selectedDisc) return;
    setLoading(true);
    try {
      const data = await getAtividadesByDisciplina(selectedDisc.id);
      setAtividades(data);
    } catch (error: any) {
      setAtividades([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { loadInitialData(); }, []);
  useEffect(() => { fetchAtividades(); }, [selectedDisc]);

  // CRUD Actions
  const handleEdit = (item: IAtividade) => {
    setEditingId(item.id);
    setFormData({
      titulo: item.titulo,
      descricao: item.descricao || '',
      tipo: item.tipo,
      conteudoTexto: item.conteudoTexto || '',
      dataEntrega: item.dataEntrega || '',
      arquivo: null
    });
    setModalVisible(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ titulo: '', descricao: '', tipo: 'texto', conteudoTexto: '', dataEntrega: '', arquivo: null });
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (!selectedDisc) return Alert.alert("Erro", "Selecione uma disciplina.");
    if (!formData.titulo) return Alert.alert("Erro", "O título é obrigatório.");

    try {
      setLoading(true);
      
      // Monta o Payload conforme os campos exigidos (Types)
      const payload: any = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        tipo: formData.tipo,
        disciplinaId: selectedDisc.id,
        dataEntrega: formData.dataEntrega
      };

      // Lógica condicional de campos
      if (formData.tipo === 'texto') {
        payload.conteudoTexto = formData.conteudoTexto;
        payload.arquivo = null;
      } else {
        payload.conteudoTexto = null;
        payload.arquivo = formData.arquivo; // Aqui iria o binário do picker
      }

      if (editingId) {
        await updateAtividade(editingId, payload);
      } else {
        await createAtividade(payload);
      }

      resetForm();
      fetchAtividades();
      Alert.alert("Sucesso", editingId ? "Atividade atualizada!" : "Atividade criada!");
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDeleteAtividade = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta atividade?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          try {
            await deleteAtividade(id);
            fetchAtividades();
          } catch (e) { Alert.alert("Erro", "Erro ao excluir."); }
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Seletor de Disciplina (Reutilizando padrão da ConteudoScreen) */}
        <TouchableOpacity 
          onPress={() => setShowDiscModal(true)}
          style={{ 
            padding: 16, 
            backgroundColor: cardBg, 
            borderRadius: 16, 
            marginBottom: 20,
            borderWidth: 1,
            borderColor: borderColor,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#05966915', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
             <MaterialCommunityIcons name="clipboard-text-outline" size={20} color="#059669" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: 'bold' }}>DISCIPLINA DAS ATIVIDADES</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>{selectedDisc?.nome || "Escolher..."}</Text>
          </View>
          <Feather name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>

        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: textColor }]}>Atividades</Text>
          <TouchableOpacity onPress={() => { resetForm(); setModalVisible(true); }}>
            <MaterialCommunityIcons name="plus-box" size={38} color="#059669" />
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator color="#059669" size="large" /> : (
          <FlatList
            data={atividades}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.cardAtividade, { backgroundColor: cardBg, borderColor: borderColor, borderWidth: 1, elevation: 0 }]}
                onPress={() => handleEdit(item)}
              >
                <View style={styles.row}>
                  <View style={styles.infoContainer}>
                    <Text style={[styles.nomeAtividade, { color: textColor }]}>{item.titulo}</Text>
                    <Text style={[styles.descricao, { color: '#64748b' }]} numberOfLines={2}>{item.descricao}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteAtividade(item.id)} style={{ padding: 5 }}>
                    <Feather name="trash-2" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <View style={styles.footerCard}>
                  <MaterialCommunityIcons name="calendar-clock" size={14} color="#ef4444" />
                  <Text style={styles.deadline}>Entrega: {item.dataEntrega || 'Sem data'}</Text>
                  <View style={{ flex: 1 }} />
                  <Text style={{ fontSize: 10, color: '#059669', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.tipo}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 50 }}>
                <MaterialCommunityIcons name="clipboard-off-outline" size={50} color="#cbd5e1" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhuma atividade para esta disciplina.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Modal: Seleção de Disciplina */}
      <Modal visible={showDiscModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 30 }}>
          <View style={{ backgroundColor: cardBg, borderRadius: 20, padding: 20, maxHeight: '60%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: textColor, textAlign: 'center' }}>Disciplina</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {disciplinas.map(d => (
                <TouchableOpacity 
                  key={d.id} 
                  style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: borderColor }}
                  onPress={() => { setSelectedDisc({ id: d.id, nome: d.nome }); setShowDiscModal(false); }}
                >
                  <Text style={{ color: textColor, fontSize: 16 }}>{d.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowDiscModal(false)} style={{ marginTop: 15, alignItems: 'center' }}>
              <Text style={{ color: '#64748b' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal: Cadastro/Edição de Atividade */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={[styles.title, { fontSize: 20, color: textColor }]}>
                  {editingId ? "Editar Atividade" : "Nova Atividade"}
                </Text>
                <TouchableOpacity onPress={resetForm}>
                  <Feather name="x" size={24} color={textColor} />
                </TouchableOpacity>
              </View>
              
              <FormInput label="Título" value={formData.titulo} onChangeText={t => setFormData({...formData, titulo: t})} inputBg={inputBg} textColor={textColor} />
              <FormInput label="Descrição" value={formData.descricao} onChangeText={t => setFormData({...formData, descricao: t})} inputBg={inputBg} textColor={textColor} multiline />
              
              <Text style={[styles.label, { color: textColor }]}>Tipo de Atividade</Text>
              <View style={styles.typeSelector}>
                {(['texto', 'pdf', 'slide'] as TAtividadeTipo[]).map(t => (
                  <TouchableOpacity 
                    key={t} 
                    style={[styles.typeButton, { backgroundColor: formData.tipo === t ? '#059669' : inputBg, borderColor: formData.tipo === t ? '#059669' : borderColor }]}
                    onPress={() => setFormData({...formData, tipo: t})}
                  >
                    <Text style={{ color: formData.tipo === t ? '#fff' : textColor, fontSize: 11, fontWeight: 'bold' }}>{t.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {formData.tipo === 'texto' ? (
                <FormInput label="Conteúdo da Atividade" value={formData.conteudoTexto} onChangeText={t => setFormData({...formData, conteudoTexto: t})} inputBg={inputBg} textColor={textColor} multiline />
              ) : (
                <TouchableOpacity style={{ padding: 20, backgroundColor: inputBg, borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#64748b', alignItems: 'center', marginBottom: 15 }}>
                  <Feather name="upload-cloud" size={24} color="#64748b" />
                  <Text style={{ color: '#64748b', fontSize: 12, marginTop: 5 }}>Selecionar arquivo {formData.tipo.toUpperCase()}</Text>
                </TouchableOpacity>
              )}

              <FormInput label="Data de Entrega" placeholder="DD/MM/AAAA" value={formData.dataEntrega} onChangeText={t => setFormData({...formData, dataEntrega: t})} inputBg={inputBg} textColor={textColor} />

              <View style={{ marginTop: 20 }}>
                <CustomButton title={editingId ? "Salvar Alterações" : "Criar Atividade"} onPress={handleSave} loading={loading} />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}