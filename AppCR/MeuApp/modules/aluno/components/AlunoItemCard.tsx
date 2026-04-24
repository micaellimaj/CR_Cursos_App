import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/AlunoHomeStyles';

interface AlunoItemCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isLightTheme: boolean;
  onPress: () => void;
}

export const AlunoItemCard: React.FC<AlunoItemCardProps> = ({ 
  title, subtitle, icon, isLightTheme, onPress 
}) => (
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
    <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
      <MaterialCommunityIcons name={icon} size={24} color="#2563eb" />
    </View>

    <View style={styles.infoContainer}>
      <Text style={[styles.mainName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
        {title}
      </Text>
      <Text style={styles.subInfo}>{subtitle}</Text>
    </View>

    <MaterialCommunityIcons 
      name="chevron-right" 
      size={24} 
      color={isLightTheme ? '#cbd5e1' : '#475569'} 
    />
  </TouchableOpacity>
);