import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IConteudo } from '../types';
import styles from '../styles/ConteudoAlunoStyles';

interface ConteudoAlunoCardProps {
  item: IConteudo;
  isLightTheme: boolean;
  onPress: (item: IConteudo) => void;
}

const getIconConfig = (tipo: string) => {
  switch (tipo) {
    case 'video': return { icon: 'play-circle-outline', color: '#ef4444' };
    case 'link': return { icon: 'link-variant', color: '#2563eb' };
    case 'arquivo': return { icon: 'file-pdf-box', color: '#10b981' };
    default: return { icon: 'text-box-outline', color: '#64748b' };
  }
};

export const ConteudoAlunoCard: React.FC<ConteudoAlunoCardProps> = ({ item, isLightTheme, onPress }) => {
  const config = getIconConfig(item.tipo);
  const textColor = isLightTheme ? '#1e293b' : '#f8fafc';
  const cardBg = isLightTheme ? '#fff' : '#1e293b';
  const borderColor = isLightTheme ? '#e2e8f0' : '#334155';

  return (
    <TouchableOpacity 
      style={[styles.cardConteudo, { backgroundColor: cardBg, borderColor: borderColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>
        <MaterialCommunityIcons name={config.icon as any} size={24} color={config.color} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.tituloConteudo, { color: textColor }]} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={[styles.tipoText, { color: config.color }]}>
          {item.tipo}
        </Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={20} color="#64748b" />
    </TouchableOpacity>
  );
};