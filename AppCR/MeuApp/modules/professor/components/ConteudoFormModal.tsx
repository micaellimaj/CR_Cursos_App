import React from 'react';
import { 
  View, Text, Modal, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormInput } from '../../admin/components/FormInput';
import CustomButton from '../../../components/CustomButton';
import { TConteudoTipo } from '../types';
import styles from '../styles/ConteudoStyles';

interface ConteudoFormModalProps {
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
}

export const ConteudoFormModal: React.FC<ConteudoFormModalProps> = ({
  visible, editingId, formData, setFormData, onClose, onSave,
  loading, textColor, cardBg, inputBg
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.modalContent, { backgroundColor: cardBg, borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor }}>
                {editingId ? "Editar Conteúdo" : "Novo Conteúdo"}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={26} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={{ color: textColor, marginBottom: 8, fontSize: 14, fontWeight: '600' }}>Tipo de Material:</Text>
              
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
                  onPress={onSave} 
                  loading={loading} 
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};