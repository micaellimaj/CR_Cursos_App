import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/MyDisciplinasStyles';

interface PedagogicoCardProps {
  title: string;
  desc: string;
  icon: string;
  color: string;
  onPress: () => void;
  isLightTheme: boolean;
}

export const PedagogicoCard: React.FC<PedagogicoCardProps> = ({
  title, desc, icon, color, onPress, isLightTheme
}) => {
  return (
    <TouchableOpacity 
      style={[styles.subjectCard, { 
        elevation: 0, 
        shadowOpacity: 0, 
        borderWidth: 1, 
        borderColor: isLightTheme ? '#e2e8f0' : '#334155',
        backgroundColor: isLightTheme ? '#fff' : '#1e293b',
        padding: 20,
        marginBottom: 15
      }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <MaterialCommunityIcons name={icon as any} size={28} color={color} />
      </View>
      <View style={styles.subjectInfo}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>{title}</Text>
        <Text style={styles.courseTag}>{desc}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#64748b" />
    </TouchableOpacity>
  );
};