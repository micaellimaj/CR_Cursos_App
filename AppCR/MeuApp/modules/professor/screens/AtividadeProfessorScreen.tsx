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

import { getAtividadesByDisciplina, createAtividade, deleteAtividade } from '../controllers/atividadeController';
import { IAtividade, TAtividadeTipo } from '../types';

export default function AtividadeProfessorScreen({ route }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'texto' as TAtividadeTipo,
    conteudoTexto: '',
    dataEntrega: ''
  });

  const textColor = isLightTheme ? '#1e293b' : '#fff';
  const inputBg = isLightTheme ? '#f1f5f9' : '#0f172a';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';

  useEffect(() => { fetchInitialData(); }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const data = await getAtividadesByDisciplina(disciplinaId);
      setAtividades(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!formData.titulo) return Alert.alert("Erro", "Título é obrigatório");
    try {
      setLoading(true);
      await createAtividade({ ...formData, disciplinaId });
      setModalVisible(false);
      fetchInitialData();
      setFormData({ titulo: '', descricao: '', tipo: 'texto', conteudoTexto: '', dataEntrega: '' });
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja remover esta atividade?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          await deleteAtividade(id);
          fetchInitialData();
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View>
            <Text style={[styles.title, { color: textColor }]}>Atividades</Text>
            <Text style={{ color: '#64748b', fontSize: 12 }}>{disciplinaNome}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="plus-box" size={35} color="#059669" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={atividades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.cardAtividade, { backgroundColor: cardBg }]}>
              <View style={styles.row}>
                <View style={styles.infoContainer}>
                  <Text style={[styles.nomeAtividade, { color: textColor }]}>{item.titulo}</Text>
                  <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Feather name="trash-2" size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
              <View style={styles.footerCard}>
                <MaterialCommunityIcons name="calendar-clock" size={14} color="#ef4444" />
                <Text style={styles.deadline}>Entrega: {item.dataEntrega || 'Sem data'}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.title, { fontSize: 18, color: textColor, marginBottom: 15 }]}>Nova Atividade</Text>
              
              <FormInput label="Título" value={formData.titulo} onChangeText={t => setFormData({...formData, titulo: t})} inputBg={inputBg} textColor={textColor} />
              <FormInput label="Descrição" value={formData.descricao} onChangeText={t => setFormData({...formData, descricao: t})} inputBg={inputBg} textColor={textColor} />
              
              <Text style={[styles.label, { color: textColor }]}>Tipo de Atividade</Text>
              <View style={styles.typeSelector}>
                {(['texto', 'pdf', 'slide'] as TAtividadeTipo[]).map(t => (
                  <TouchableOpacity 
                    key={t} 
                    style={[styles.typeButton, formData.tipo === t && { backgroundColor: '#059669', borderColor: '#059669' }]}
                    onPress={() => setFormData({...formData, tipo: t})}
                  >
                    <Text style={{ color: formData.tipo === t ? '#fff' : textColor, fontSize: 12, fontWeight: 'bold' }}>{t.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {formData.tipo === 'texto' && (
                <FormInput label="Texto da Atividade" value={formData.conteudoTexto} onChangeText={t => setFormData({...formData, conteudoTexto: t})} inputBg={inputBg} textColor={textColor} />
              )}

              <FormInput label="Data de Entrega (Ex: 25/12/2026)" value={formData.dataEntrega} onChangeText={t => setFormData({...formData, dataEntrega: t})} inputBg={inputBg} textColor={textColor} />

              <View style={{ marginTop: 10 }}>
                <CustomButton title="Criar Atividade" onPress={handleSave} loading={loading} />
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 15, marginBottom: 20 }}>
                  <Text style={{ textAlign: 'center', color: '#64748b' }}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}