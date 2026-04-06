import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IPrivado } from '../types';
import styles from '../styles/ConteudoStyles';

interface PrivadoCardProps {
  item: IPrivado;
  isLightTheme: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const PrivadoCard: React.FC<PrivadoCardProps> = ({ item, isLightTheme, onEdit, onDelete }) => {
  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  return (
    <View style={[styles.cardConteudo, { 
      backgroundColor: cardBg, 
      borderColor: borderColor, 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      borderWidth: 1,
      elevation: 0
    }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 8 }}>
        <Text style={{ color: '#64748b', fontSize: 12 }}>
          {item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
        </Text>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity onPress={onEdit}>
            <Feather name="edit-2" size={16} color="#2563eb" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Feather name="trash-2" size={16} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={{ color: textColor, fontSize: 15, lineHeight: 22 }}>{item.mensagem}</Text>
      
      {item.arquivos && item.arquivos.length > 0 && (
        <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
          {item.arquivos.map((arq, idx) => (
            <View key={idx} style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}>
              <Text style={{ color: '#2563eb', fontSize: 10, fontWeight: '600' }}>{arq.nome}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};