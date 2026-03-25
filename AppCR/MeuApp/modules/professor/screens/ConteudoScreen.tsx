import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Modal, Alert, 
  ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import CustomButton from '../../../components/CustomButton';
import { FormInput } from '../../admin/components/FormInput'; 

// Estilo Próprio
import styles from '../styles/ConteudoStyles';

// Controller e Types
import { getConteudosByDisciplina, createConteudo, deleteConteudo } from '../controllers/conteudoController';
import { IConteudo, TConteudoTipo } from '../types';

export default function ConteudoScreen({ route }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [conteudos, setConteudos] = useState<IConteudo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipo: 'texto' as TConteudoTipo,
    valor: '',
  });

  // Definições de cores para o FormInput e UI
  const textColor = isLightTheme ? '#1e293b' : '#fff';
  const inputBg = isLightTheme ? '#f1f5f9' : '#0f172a';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';

  useEffect(() => { fetchInitialData(); }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const data = await getConteudosByDisciplina(disciplinaId);
      setConteudos(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!formData.titulo) return Alert.alert("Erro", "Título é obrigatório");
    try {
      setLoading(true);
      await createConteudo({ ...formData, disciplinaId });
      setModalVisible(false);
      fetchInitialData();
      setFormData({ titulo: '', descricao: '', tipo: 'texto', valor: '' });
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally { setLoading(false); }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Deseja apagar este conteúdo?", [
      { text: "Cancelar", style: 'cancel' },
      { text: "Excluir", style: 'destructive', onPress: async () => {
          await deleteConteudo(id);
          fetchInitialData();
      }}
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: textColor }]}>Conteúdos</Text>
            <Text style={{ color: '#64748b', fontSize: 12 }}>{disciplinaNome}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="plus-circle" size={35} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator color="#2563eb" style={{ marginBottom: 10 }} />}

        <FlatList
          data={conteudos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={[styles.cardConteudo, { backgroundColor: cardBg }]}>
              <View style={styles.infoContainer}>
                <Text style={[styles.nomeConteudo, { color: textColor }]}>{item.titulo}</Text>
                <Text style={[styles.tipoBadge, { 
                  backgroundColor: 'rgba(37, 99, 235, 0.1)', 
                  color: '#2563eb' 
                }]}>{item.tipo}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 5 }}>
                <Feather name="trash-2" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.title, { fontSize: 18, color: textColor }]}>Novo Conteúdo</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={textColor} />
              </TouchableOpacity>
            </View>
            
            <FormInput 
              label="Título do Material" 
              value={formData.titulo} 
              onChangeText={t => setFormData({...formData, titulo: t})}
              inputBg={inputBg}
              textColor={textColor}
            />
            
            <FormInput 
                label="Conteúdo (Texto ou Link)" 
                value={formData.valor} 
                onChangeText={t => setFormData({...formData, valor: t})}
                inputBg={inputBg}
                textColor={textColor}
                />

            <CustomButton title="Publicar Conteúdo" onPress={handleSave} loading={loading} />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}