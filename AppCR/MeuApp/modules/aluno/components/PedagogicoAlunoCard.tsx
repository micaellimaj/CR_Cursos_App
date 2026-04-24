import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/AlunoHomeStyles';

interface PedagogicoAlunoCardProps {
  title: string;
  desc: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  onPress: () => void;
  isLightTheme: boolean;
}

export const PedagogicoAlunoCard: React.FC<PedagogicoAlunoCardProps> = ({
  title, desc, icon, color, onPress, isLightTheme
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          borderColor: isLightTheme ? '#e2e8f0' : '#334155',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon} size={28} color={color} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.mainName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
          {title}
        </Text>
        <Text style={styles.subInfo}>{desc}</Text>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
    </TouchableOpacity>
  );
};