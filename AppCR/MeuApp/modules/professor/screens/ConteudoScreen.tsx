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
import styles from '../styles/ConteudoStyles';
import { 
  getConteudosByDisciplina, 
  createConteudo, 
  deleteConteudo, 
  updateConteudo // Importando a nova rota
} from '../controllers/conteudoController';
import { getMyDisciplinas } from '../controllers/disciplinaController';
import { useAuth } from '../../../contexts/AuthContext';
import { IConteudo, TConteudoTipo, IDisciplinaProfessor } from '../types';

export default function ConteudoScreen({ route, navigation }: any) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [disciplinas, setDisciplinas] = useState<IDisciplinaProfessor[]>([]);
  const [selectedDisc, setSelectedDisc] = useState<{id: string, nome: string} | null>(null);
  const [conteudos, setConteudos] = useState<IConteudo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDiscModal, setShowDiscModal] = useState(false);
  
  // Estado para controlar se estamos editando
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'texto' as TConteudoTipo,
    valor: '',
    url: '',
  });

  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const inputBg = isLightTheme ? '#f1f5f9' : '#0f172a';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  const loadDisciplinas = async () => {
    try {
      const lista = await getMyDisciplinas(user?.id);
      setDisciplinas(lista);
      if (route.params?.disciplinaId) {
        setSelectedDisc({ id: route.params.disciplinaId, nome: route.params.disciplinaNome });
      } else if (lista.length > 0) {
        setSelectedDisc({ id: lista[0].id, nome: lista[0].nome });
      }
    } catch (e) { Alert.alert("Erro", "Erro ao carregar dados."); }
  };

  const fetchConteudos = async () => {
    if (!selectedDisc) return;
    setLoading(true);
    try {
      const data = await getConteudosByDisciplina(selectedDisc.id);
      setConteudos(data);
    } catch (error) { setConteudos([]); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadDisciplinas(); }, []);
  useEffect(() => { fetchConteudos(); }, [selectedDisc]);

  // Abre o modal para edição preenchendo os campos
  const handleEdit = (item: IConteudo) => {
    setEditingId(item.id);
    setFormData({
      titulo: item.titulo,
      descricao: item.descricao || '',
      tipo: item.tipo,
      valor: item.valor || '',
      url: item.url || '',
    });
    setModalVisible(true);
  };

  // Reseta o formulário ao fechar o modal ou após salvar
  const resetForm = () => {
    setEditingId(null);
    setFormData({ titulo: '', descricao: '', tipo: 'texto', valor: '', url: '' });
    setModalVisible(false);
  };

  const handleSave = async () => {
    if (!selectedDisc) return Alert.alert("Erro", "Selecione uma disciplina.");
    if (!formData.titulo) return Alert.alert("Erro", "Título é obrigatório.");

    try {
      setLoading(true);

      const payload: any = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        tipo: formData.tipo,
        disciplinaId: selectedDisc.id,
      };

      if (formData.tipo === 'texto') {
        payload.valor = formData.valor;
        payload.url = null;
      } else {
        payload.url = formData.url;
        payload.valor = null;
      }

      if (editingId) {
        // Lógica de Edição
        await updateConteudo(editingId, payload);
      } else {
        // Lógica de Criação
        await createConteudo(payload);
      }
      
      resetForm();
      fetchConteudos();
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja apagar este material?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          try {
            await deleteConteudo(id);
            fetchConteudos();
          } catch (e) { Alert.alert("Erro", "Falha ao remover conteúdo."); }
      }}
    ]);
  };

  const TipoSelector = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
      {(['texto', 'link', 'video'] as TConteudoTipo[]).map((t) => (
        <TouchableOpacity 
          key={t}
          onPress={() => setFormData({...formData, tipo: t})}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: formData.tipo === t ? '#2563eb' : inputBg,
            width: '30%',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: formData.tipo === t ? '#fff' : '#64748b', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' }}>{t}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        {/* Seletor de Disciplina */}
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
          <View style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: '#2563eb15', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
             <MaterialCommunityIcons name="book-open-variant" size={20} color="#2563eb" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: 'bold' }}>DISCIPLINA SELECIONADA</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>{selectedDisc?.nome || "Toque para escolher"}</Text>
          </View>
          <Feather name="chevron-down" size={20} color="#64748b" />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Text style={[styles.title, { color: textColor }]}>Conteúdos</Text>
          <TouchableOpacity 
            onPress={() => { resetForm(); setModalVisible(true); }}
            style={{ backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}
          >
            <Feather name="plus" size={18} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 4 }}>Novo</Text>
          </TouchableOpacity>
        </View>

        {loading ? <ActivityIndicator color="#2563eb" style={{ marginTop: 20 }} /> : (
          <FlatList
            data={conteudos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.cardConteudo, { backgroundColor: cardBg, borderColor: borderColor }]}
                onPress={() => handleEdit(item)} // Clicar no card abre a edição
              >
                <View style={styles.infoContainer}>
                  <Text style={[styles.nomeConteudo, { color: textColor }]}>{item.titulo}</Text>
                  <Text style={[styles.tipoBadge, { backgroundColor: '#2563eb15', color: '#2563eb' }]}>
                    {item.tipo}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Feather name="edit-2" size={18} color="#2563eb" style={{ marginRight: 15 }} />
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Feather name="trash-2" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', marginTop: 40 }}>
                <MaterialCommunityIcons name="folder-open-outline" size={60} color="#cbd5e1" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhum conteúdo postado ainda.</Text>
              </View>
            }
          />
        )}
      </View>

      {/* Modal: Seleção de Disciplina */}
      <Modal visible={showDiscModal} transparent animationType="fade">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 25 }}>
          <View style={{ backgroundColor: cardBg, borderRadius: 20, padding: 20, maxHeight: '60%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 15, color: textColor, textAlign: 'center' }}>Selecionar Disciplina</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {disciplinas.map(d => (
                <TouchableOpacity 
                  key={d.id} 
                  style={{ paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155' }}
                  onPress={() => { setSelectedDisc({ id: d.id, nome: d.nome }); setShowDiscModal(false); }}
                >
                  <Text style={{ color: textColor, fontSize: 16 }}>{d.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowDiscModal(false)} style={{ marginTop: 15, padding: 12, alignItems: 'center' }}>
              <Text style={{ color: '#64748b', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal: Cadastro/Edição */}
      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={[styles.modalContent, { backgroundColor: cardBg, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 }]}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor }}>
                  {editingId ? "Editar Conteúdo" : "Novo Conteúdo"}
                </Text>
                <TouchableOpacity onPress={resetForm}>
                  <Feather name="x" size={26} color={textColor} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={{ color: textColor, marginBottom: 8, fontSize: 14, fontWeight: '600' }}>Tipo de Material:</Text>
                <TipoSelector />

                <FormInput 
                  label="Título do Conteúdo" 
                  value={formData.titulo} 
                  onChangeText={t => setFormData({...formData, titulo: t})}
                  inputBg={inputBg} textColor={textColor}
                />

                <FormInput 
                  label="Descrição curta (Opcional)" 
                  value={formData.descricao} 
                  onChangeText={t => setFormData({...formData, descricao: t})}
                  inputBg={inputBg} textColor={textColor}
                />

                {formData.tipo === 'texto' ? (
                  <FormInput 
                    label="Texto da Aula" 
                    value={formData.valor} 
                    onChangeText={t => setFormData({...formData, valor: t})}
                    inputBg={inputBg} textColor={textColor}
                    multiline={true}
                  />
                ) : (
                  <FormInput 
                    label="Link / URL do Material" 
                    value={formData.url} 
                    onChangeText={t => setFormData({...formData, url: t})}
                    inputBg={inputBg} textColor={textColor}
                  />
                )}

                <View style={{ marginTop: 15 }}>
                  <CustomButton 
                    title={editingId ? "Salvar Alterações" : "Publicar Agora"} 
                    onPress={handleSave} 
                    loading={loading} 
                  />
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}