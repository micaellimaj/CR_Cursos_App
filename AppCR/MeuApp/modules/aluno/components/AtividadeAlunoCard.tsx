import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IAtividade } from '../types';
import styles from '../styles/AtividadeAlunoStyles';

interface AtividadeAlunoCardProps {
  item: IAtividade;
  isLightTheme: boolean;
  onPress: (item: IAtividade) => void;
}

export const AtividadeAlunoCard: React.FC<AtividadeAlunoCardProps> = ({ item, isLightTheme, onPress }) => {
  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  return (
    <TouchableOpacity 
      style={[styles.cardAtividade, { backgroundColor: cardBg, borderColor: borderColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.statusBadge, { backgroundColor: '#10b98115' }]}>
        <Text style={[styles.statusText, { color: '#10b981' }]}>{item.tipo}</Text>
      </View>

      <Text style={[styles.tituloAtividade, { color: textColor }]}>{item.titulo}</Text>
      
      <Text style={styles.descricao} numberOfLines={2}>
        {item.descricao || "Sem descrição disponível."}
      </Text>

      <View style={styles.footer}>
        <MaterialCommunityIcons name="calendar-clock" size={16} color="#ef4444" />
        <Text style={[styles.deadlineText, { color: '#ef4444' }]}>
          Entrega: {item.dataEntrega || 'Não definida'}
        </Text>
        <View style={{ flex: 1 }} />
        <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
      </View>
    </TouchableOpacity>
  );
};