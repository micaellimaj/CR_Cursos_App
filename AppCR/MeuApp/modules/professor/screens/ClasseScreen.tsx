import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Modal, Alert, 
  ActivityIndicator, SafeAreaView, ScrollView 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/ConteudoStyles';

import { ClasseCard } from '../components/ClasseCard';
import { ClasseModal } from '../components/ClasseModal';

import { 
  getClassesByTurma, 
  createClassePost, 
  deleteClassePost, 
  updateClassePost 
} from '../controllers/classeController';
import { getMyTurmas } from '../controllers/turmaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IClasse, ITurmaProfessor, TClasseTipo } from '../types';

export default function ClasseScreen({ route, navigation }: any) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [turmas, setTurmas] = useState<ITurmaProfessor[]>([]);
  const [selectedTurma, setSelectedTurma] = useState<{id: string, nome: string} | null>(null);
  const [posts, setPosts] = useState<IClasse[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTurmaModal, setShowTurmaModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'material' as TClasseTipo,
    links: ''
  });

  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const inputBg = isLightTheme ? '#f1f5f9' : '#0f172a';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  const loadTurmas = async () => {
    if (!user?.id) return; 
    try {
      const lista = await getMyTurmas(user.id);
      setTurmas(lista);
    } catch (e) { 
      Alert.alert("Erro", "Erro ao carregar turmas."); 
    }
  };

  const fetchPosts = async () => {
    if (!selectedTurma) return;
    setLoading(true);
    try {
      const data = await getClassesByTurma(selectedTurma.id);
      setPosts(data);
    } catch (error) { setPosts([]); } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (user?.id) loadTurmas();
  }, [user?.id]);

  useEffect(() => { fetchPosts(); }, [selectedTurma]);

  const handleEdit = (item: IClasse) => {
    setEditingId(item.id);
    setFormData({
      titulo: item.titulo,
      descricao: item.descricao || '',
      tipo: item.tipo,
      links: item.anexos ? item.anexos.filter(a => a.tipo === 'link').map(a => a.url).join(', ') : ''
    });
    setModalVisible(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ titulo: '', descricao: '', tipo: 'material', links: '' });
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (!selectedTurma || !user?.id) return Alert.alert("Erro", "Turma ou Professor não identificado.");
    if (!formData.titulo) return Alert.alert("Erro", "Título é obrigatório.");

    try {
      setLoading(true);
      if (editingId) {
        await updateClassePost(editingId, {
          titulo: formData.titulo,
          descricao: formData.descricao,
          tipo: formData.tipo
        });
      } else {
        const linksArray = formData.links ? formData.links.split(',').map(l => l.trim()) : [];
        await createClassePost({
          turma_id: selectedTurma.id,
          professor_id: user.id,
          titulo: formData.titulo,
          descricao: formData.descricao,
          tipo: formData.tipo,
          links: linksArray,
          files: []
        });
      }
      resetForm();
      fetchPosts();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta postagem do mural?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          try {
            await deleteClassePost(id);
            fetchPosts();
          } catch (e) { Alert.alert("Erro", "Falha ao remover postagem."); }
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Seletor de Turma */}
        <TouchableOpacity 
          onPress={() => setShowTurmaModal(true)}
          style={{ 
            padding: 16, backgroundColor: cardBg, borderRadius: 16, marginBottom: 20,
            borderWidth: 1, borderColor: borderColor, flexDirection: 'row', alignItems: 'center',
          }}
        >
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#2563eb15', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
             <MaterialCommunityIcons name="google-classroom" size={20} color="#2563eb" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: 'bold' }}>TURMA SELECIONADA</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>{selectedTurma?.nome || "Escolha uma turma"}</Text>
          </View>
          <Feather name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.title, { color: textColor }]}>Mural da Classe</Text>
          <TouchableOpacity 
            onPress={() => { resetForm(); setModalVisible(true); }}
            style={{ backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}
          >
            <Feather name="plus" size={18} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Postar</Text>
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator color="#2563eb" style={{ marginTop: 20 }} /> : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ClasseCard 
                item={item}
                textColor={textColor}
                cardBg={cardBg}
                borderColor={borderColor}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <MaterialCommunityIcons name="post-outline" size={60} color="#cbd5e1" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhuma postagem nesta turma.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Modal: Seleção de Turma */}
      <Modal visible={showTurmaModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 25 }}>
          <View style={{ backgroundColor: cardBg, borderRadius: 20, padding: 20, maxHeight: '60%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: textColor, textAlign: 'center' }}>Selecionar Turma</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {turmas.map(t => (
                <TouchableOpacity 
                  key={t.id} 
                  style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: borderColor }}
                  onPress={() => { setSelectedTurma({ id: t.id, nome: t.nome }); setShowTurmaModal(false); }}
                >
                  <Text style={{ color: textColor, fontSize: 16 }}>{t.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowTurmaModal(false)} style={{ marginTop: 15, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal: Cadastro/Edição */}
      <ClasseModal 
        visible={modalVisible}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onClose={resetForm}
        onSave={handleSave}
        loading={loading}
        textColor={textColor}
        cardBg={cardBg}
        inputBg={inputBg}
      />
    </SafeAreaView>
  );
}