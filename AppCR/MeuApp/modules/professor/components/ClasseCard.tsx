import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IClasse } from '../types';
import styles from '../styles/ConteudoStyles';

interface ClasseCardProps {
  item: IClasse;
  textColor: string;
  cardBg: string;
  borderColor: string;
  onEdit: (item: IClasse) => void;
  onDelete: (id: string) => void;
}

export const ClasseCard: React.FC<ClasseCardProps> = ({
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
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.tipoBadge, { backgroundColor: '#2563eb15', color: '#2563eb', marginRight: 5 }]}>
            {item.tipo}
          </Text>
          {item.anexos && item.anexos.length > 0 && (
            <Text style={[styles.tipoBadge, { backgroundColor: '#10b98115', color: '#10b981' }]}>
              {item.anexos.length} anexo(s)
            </Text>
          )}
        </View>
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