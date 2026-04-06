import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { IAtividade } from '../types';
import styles from '../styles/AtividadeStyles';

interface AtividadeCardProps {
  item: IAtividade;
  textColor: string;
  cardBg: string;
  borderColor: string;
  onEdit: (item: IAtividade) => void;
  onDelete: (id: string) => void;
}

export const AtividadeCard: React.FC<AtividadeCardProps> = ({ 
  item, 
  textColor, 
  cardBg, 
  borderColor, 
  onEdit, 
  onDelete 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.cardAtividade, { backgroundColor: cardBg, borderColor: borderColor, borderWidth: 1, elevation: 0 }]}
      onPress={() => onEdit(item)}
    >
      <View style={styles.row}>
        <View style={styles.infoContainer}>
          <Text style={[styles.nomeAtividade, { color: textColor }]}>{item.titulo}</Text>
          <Text style={[styles.descricao, { color: '#64748b' }]} numberOfLines={2}>{item.descricao}</Text>
        </View>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={{ padding: 5 }}>
          <Feather name="trash-2" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.footerCard}>
        <MaterialCommunityIcons name="calendar-clock" size={14} color="#ef4444" />
        <Text style={styles.deadline}>Entrega: {item.dataEntrega || 'Sem data'}</Text>
        <View style={{ flex: 1 }} />
        <Text style={{ fontSize: 10, color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.tipo}</Text>
      </View>
    </TouchableOpacity>
  );
};