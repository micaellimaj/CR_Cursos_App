import React from 'react';
import { 
  View, Text, Modal, TouchableOpacity, ScrollView, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FormInput } from '../../admin/components/FormInput';
import CustomButton from '../../../components/CustomButton';
import { TClasseTipo } from '../types';
import styles from '../styles/ConteudoStyles';

interface ClasseModalProps {
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

export const ClasseModal: React.FC<ClasseModalProps> = ({
  visible, editingId, formData, setFormData, onClose, onSave,
  loading, textColor, cardBg, inputBg
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor }}>
                {editingId ? "Editar Postagem" : "Nova Postagem"}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={26} color={textColor} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ color: textColor, marginBottom: 8, fontSize: 14, fontWeight: '600' }}>Tipo de Postagem:</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                {(['material', 'aviso', 'atividade'] as TClasseTipo[]).map((t) => (
                  <TouchableOpacity 
                    key={t}
                    onPress={() => setFormData({...formData, tipo: t})}
                    style={{
                      padding: 10,
                      borderRadius: 8,
                      backgroundColor: formData.tipo === t ? '#2563eb' : inputBg,
                      width: '32%',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: formData.tipo === t ? '#fff' : '#64748b', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <FormInput 
                label="Título da Postagem" 
                value={formData.titulo} 
                onChangeText={t => setFormData({...formData, titulo: t})}
                inputBg={inputBg} textColor={textColor}
              />

              <FormInput 
                label="Descrição / Mensagem" 
                value={formData.descricao} 
                onChangeText={t => setFormData({...formData, descricao: t})}
                inputBg={inputBg} textColor={textColor}
                multiline={true}
              />

              {!editingId && (
                <FormInput 
                  label="Links (separados por vírgula)" 
                  placeholder="ex: https://youtube.com/..., https://drive..."
                  value={formData.links} 
                  onChangeText={t => setFormData({...formData, links: t})}
                  inputBg={inputBg} textColor={textColor}
                />
              )}

              <View style={{ marginTop: 15 }}>
                <CustomButton 
                  title={editingId ? "Salvar Alterações" : "Postar no Mural"} 
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