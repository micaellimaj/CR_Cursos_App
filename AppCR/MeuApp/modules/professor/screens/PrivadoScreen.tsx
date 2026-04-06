import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Modal, Alert, 
  ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import { FormInput } from '../../admin/components/FormInput'; 
import { PrivadoCard } from '../components/PrivadoCard';
import styles from '../styles/ConteudoStyles';

import { 
  getConteudoPrivadoByAluno, 
  enviarConteudoPrivado, 
  deleteConteudoPrivado, 
  updateConteudoPrivado 
} from '../controllers/privadoController';
import { getMyTurmas, getAlunosDaTurma } from '../controllers/turmaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IPrivado, ITurmaProfessor, IAlunoTurma } from '../types';

export default function PrivadoScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [turmas, setTurmas] = useState<ITurmaProfessor[]>([]);
  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [mensagens, setMensagens] = useState<IPrivado[]>([]);
  
  const [selectedTurma, setSelectedTurma] = useState<ITurmaProfessor | null>(null);
  const [selectedAluno, setSelectedAluno] = useState<IAlunoTurma | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTurmaModal, setShowTurmaModal] = useState(false);
  const [showAlunoModal, setShowAlunoModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ mensagem: '', links: '' });

  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  useEffect(() => { if (user?.id) loadTurmas(); }, [user?.id]);
  useEffect(() => { if (selectedTurma) loadAlunos(); }, [selectedTurma]);
  useEffect(() => { if (selectedAluno) fetchMensagens(); }, [selectedAluno]);

  const loadTurmas = async () => {
    try {
      const lista = await getMyTurmas(user!.id);
      setTurmas(lista);
    } catch (e) { Alert.alert("Erro", "Falha ao carregar turmas."); }
  };

  const loadAlunos = async () => {
    if (!selectedTurma) return;
    try {
      const lista = await getAlunosDaTurma(selectedTurma.id);
      setAlunos(lista);
      setSelectedAluno(null);
      setMensagens([]);
    } catch (e) { Alert.alert("Erro", "Falha ao carregar alunos."); }
  };

  const fetchMensagens = async () => {
    if (!selectedAluno?.id) return;
    setLoading(true);
    try {
      const data = await getConteudoPrivadoByAluno(selectedAluno.id);
      setMensagens(data);
    } catch (error) { setMensagens([]); } 
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!selectedTurma || !selectedAluno?.id) return Alert.alert("Erro", "Selecione turma e aluno.");
    if (!formData.mensagem) return Alert.alert("Erro", "A mensagem é obrigatória.");

    try {
      setLoading(true);
      if (editingId) {
        await updateConteudoPrivado(selectedAluno.id, editingId, formData.mensagem);
      } else {
        const linksArray = formData.links ? formData.links.split(',').map(l => l.trim()) : [];
        await enviarConteudoPrivado({
          aluno_id: selectedAluno.id,
          turma_id: selectedTurma.id,
          mensagem: formData.mensagem,
          links: linksArray,
          files: []
        });
      }
      resetForm();
      fetchMensagens();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDelete = (msgId: string) => {
    if (!selectedAluno?.id) return;
    Alert.alert("Excluir", "Remover esta mensagem privada?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          try {
            await deleteConteudoPrivado(selectedAluno.id!, msgId);
            fetchMensagens();
          } catch (e) { Alert.alert("Erro", "Falha ao remover."); }
      }}
    ]);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ mensagem: '', links: '' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Seletores Superiores */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <TouchableOpacity 
            onPress={() => setShowTurmaModal(true)}
            style={{ flex: 1, padding: 12, backgroundColor: cardBg, borderRadius: 12, borderWidth: 1, borderColor: borderColor }}
          >
            <Text style={{ fontSize: 10, color: '#64748b', fontWeight: 'bold' }}>TURMA</Text>
            <Text numberOfLines={1} style={{ color: textColor, fontWeight: 'bold' }}>{selectedTurma?.nome || "Selecionar"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => selectedTurma ? setShowAlunoModal(true) : Alert.alert("Aviso", "Selecione uma turma primeiro")}
            style={{ flex: 1, padding: 12, backgroundColor: cardBg, borderRadius: 12, borderWidth: 1, borderColor: borderColor }}
          >
            <Text style={{ fontSize: 10, color: '#64748b', fontWeight: 'bold' }}>ALUNO</Text>
            <Text numberOfLines={1} style={{ color: textColor, fontWeight: 'bold' }}>{selectedAluno?.full_name || "Selecionar"}</Text>
          </TouchableOpacity>
        </View>

        {/* Título e Botão Adicionar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.title, { color: textColor }]}>Privado</Text>
          <TouchableOpacity 
            onPress={() => { resetForm(); setModalVisible(true); }}
            style={{ backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 }}
          >
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={mensagens}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PrivadoCard 
                item={item}
                isLightTheme={isLightTheme}
                onEdit={() => { setEditingId(item.id); setFormData({ mensagem: item.mensagem, links: '' }); setModalVisible(true); }}
                onDelete={() => handleDelete(item.id)}
              />
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Feather name="mail" size={48} color={borderColor} />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhuma mensagem para este aluno.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Modal Selecionar Turma */}
      <Modal visible={showTurmaModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 25 }}>
          <View style={{ backgroundColor: cardBg, borderRadius: 20, padding: 20 }}>
            <Text style={{ fontWeight: 'bold', color: textColor, marginBottom: 15, fontSize: 16 }}>Selecionar Turma</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {turmas.map(t => (
                <TouchableOpacity key={t.id} style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderColor }} onPress={() => { setSelectedTurma(t); setShowTurmaModal(false); }}>
                  <Text style={{ color: textColor, fontSize: 15 }}>{t.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowTurmaModal(false)} style={{ marginTop: 15, padding: 10, alignItems: 'center' }}>
              <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Selecionar Aluno */}
      <Modal visible={showAlunoModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 25 }}>
          <View style={{ backgroundColor: cardBg, borderRadius: 20, padding: 20 }}>
            <Text style={{ fontWeight: 'bold', color: textColor, marginBottom: 15, fontSize: 16 }}>Selecionar Aluno</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {alunos.map(a => (
                <TouchableOpacity key={a.id} style={{ paddingVertical: 15, borderBottomWidth: 0.5, borderColor }} onPress={() => { setSelectedAluno(a); setShowAlunoModal(false); }}>
                  <Text style={{ color: textColor, fontSize: 15 }}>{a.full_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowAlunoModal(false)} style={{ marginTop: 15, padding: 10, alignItems: 'center' }}>
              <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Enviar/Editar Mensagem */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.modalContent, { backgroundColor: cardBg, borderTopLeftRadius: 25, borderTopRightRadius: 25 }]}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
                {editingId ? "Editar Mensagem" : "Nova Mensagem Privada"}
              </Text>
              <TouchableOpacity onPress={resetForm}><Feather name="x" size={24} color={textColor} /></TouchableOpacity>
            </View>
            <FormInput 
              label="Conteúdo da Mensagem" 
              value={formData.mensagem} 
              onChangeText={t => setFormData({...formData, mensagem: t})}
              inputBg={isLightTheme ? '#f8fafc' : '#0f172a'} textColor={textColor} multiline
            />
            {!editingId && (
              <FormInput 
                label="Links de apoio (opcional, separe por vírgula)" 
                value={formData.links} 
                onChangeText={t => setFormData({...formData, links: t})}
                inputBg={isLightTheme ? '#f8fafc' : '#0f172a'} textColor={textColor}
              />
            )}
            <View style={{ marginTop: 10 }}>
              <CustomButton title={editingId ? "Atualizar Mensagem" : "Enviar Mensagem"} onPress={handleSave} loading={loading} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}