import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IConteudo } from '../types';
import styles from '../styles/ConteudoStyles';

interface ConteudoCardProps {
  item: IConteudo;
  textColor: string;
  cardBg: string;
  borderColor: string;
  onEdit: (item: IConteudo) => void;
  onDelete: (id: string) => void;
}

export const ConteudoCard: React.FC<ConteudoCardProps> = ({
  item,
  textColor,
  cardBg,
  borderColor,
  onEdit,
  onDelete,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.cardConteudo, { backgroundColor: cardBg, borderColor: borderColor }]}
      onPress={() => onEdit(item)}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.nomeConteudo, { color: textColor }]}>{item.titulo}</Text>
        <Text style={[styles.tipoBadge, { backgroundColor: '#2563eb15', color: '#2563eb' }]}>
          {item.tipo}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather name="edit-2" size={18} color="#2563eb" style={{ marginRight: 15 }} />
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Feather name="trash-2" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};