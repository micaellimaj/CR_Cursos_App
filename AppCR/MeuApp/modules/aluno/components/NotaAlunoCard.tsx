import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { INota } from '../types';
import styles from '../styles/NotasAlunoStyles';

interface NotaAlunoCardProps {
  item: INota;
  isLightTheme: boolean;
}

export const NotaAlunoCard: React.FC<NotaAlunoCardProps> = ({ item, isLightTheme }) => {
  const notaFinal = item.valor ?? item.nota ?? 0;
  const isHighNote = notaFinal >= 7;
  
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';
  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';

  return (
    <View style={[styles.notaCard, { backgroundColor: cardBg, borderColor: borderColor }]}>
      <View style={[styles.notaIcon, { backgroundColor: isHighNote ? '#10b98115' : '#ef444415' }]}>
        <MaterialCommunityIcons 
          name="star-outline" 
          size={22} 
          color={isHighNote ? '#10b981' : '#ef4444'} 
        />
      </View>

      <View style={styles.notaInfo}>
        <Text style={[styles.notaDesc, { color: textColor }]}>{item.descricao}</Text>
        <Text style={styles.notaDate}>Lançado em {new Date(item.created_at || '').toLocaleDateString('pt-BR')}</Text>
      </View>

      <View style={[styles.notaValueContainer, { backgroundColor: isHighNote ? '#10b98110' : '#ef444410' }]}>
        <Text style={[styles.notaValue, { color: isHighNote ? '#10b981' : '#ef4444' }]}>
          {notaFinal.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};