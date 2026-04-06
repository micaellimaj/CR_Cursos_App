import React from 'react';
import { 
  View, Text, Modal, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormInput } from '../../admin/components/FormInput';
import CustomButton from '../../../components/CustomButton';
import { TAtividadeTipo } from '../types';
import styles from '../styles/AtividadeStyles';

interface AtividadeModalProps {
  visible: boolean;
  editingId: string | null;
  formData: any;
  setFormData: (data: any) => void;
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
  textColor: string;
  cardBg: string;
  inputBg: string;
  borderColor: string;
}

export const AtividadeModal: React.FC<AtividadeModalProps> = ({
  visible, editingId, formData, setFormData, onClose, onSave, 
  loading, textColor, cardBg, inputBg, borderColor
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={[styles.title, { fontSize: 20, color: textColor }]}>
                {editingId ? "Editar Atividade" : "Nova Atividade"}
              </Text>
              <TouchableOpacity onPress={onClose}>
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
                  style={[styles.typeButton, { 
                    backgroundColor: formData.tipo === t ? '#2563eb' : inputBg, 
                    borderColor: formData.tipo === t ? '#2563eb' : borderColor 
                  }]}
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
              <CustomButton title={editingId ? "Salvar Alterações" : "Criar Atividade"} onPress={onSave} loading={loading} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};