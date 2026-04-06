import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IDisciplinaProfessor } from '../types';
import styles from '../styles/MyDisciplinasStyles';

interface DisciplinaCardProps {
  item: IDisciplinaProfessor;
  isLightTheme: boolean;
  onPress: () => void;
}

export const DisciplinaCard: React.FC<DisciplinaCardProps> = ({ 
  item, 
  isLightTheme, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.subjectCard, 
        { 
          backgroundColor: isLightTheme ? '#fff' : '#1e293b',
          elevation: 0, 
          shadowOpacity: 0, 
          borderWidth: 1, 
          borderColor: isLightTheme ? '#e2e8f0' : '#334155',
          padding: 20,
          marginBottom: 15,
          flexDirection: 'row',
          alignItems: 'center'
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.iconContainer, 
        { 
          backgroundColor: 'rgba(37, 99, 235, 0.1)', 
          width: 50, height: 50, borderRadius: 12, 
          justifyContent: 'center', alignItems: 'center' 
        }
      ]}>
        <MaterialCommunityIcons name="book-open-outline" size={26} color="#2563eb" />
      </View>

      <View style={[styles.subjectInfo, { marginLeft: 15, flex: 1 }]}>
        <Text style={[
          styles.subjectName, 
          { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 16, fontWeight: 'bold' }
        ]}>
          {item.nome}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialCommunityIcons name="account-group-outline" size={14} color="#64748b" />
          <Text style={[styles.courseTag, { marginLeft: 4, color: '#64748b' }]}>
            {item.turmasAssociadas?.length || 0} turmas vinculadas
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons 
        name="chevron-right" 
        size={24} 
        color={isLightTheme ? '#cbd5e1' : '#475569'} 
      />
    </TouchableOpacity>
  );
};