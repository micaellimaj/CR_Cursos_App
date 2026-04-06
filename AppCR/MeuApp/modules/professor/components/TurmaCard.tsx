import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ITurmaProfessor } from '../types';
import styles from '../styles/MyDisciplinasStyles';

interface TurmaCardProps {
  item: ITurmaProfessor;
  isLightTheme: boolean;
  userId?: string;
  onPress: () => void;
}

export const TurmaCard: React.FC<TurmaCardProps> = ({ 
  item, 
  isLightTheme, 
  userId, 
  onPress 
}) => {
  const isTitular = item.professor_principal_id === userId;

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
        <MaterialCommunityIcons name="google-classroom" size={26} color="#2563eb" />
      </View>

      <View style={[styles.subjectInfo, { marginLeft: 15, flex: 1 }]}>
        <Text style={[
          styles.subjectName, 
          { color: isLightTheme ? '#1e293b' : '#fff', fontSize: 16, fontWeight: 'bold' }
        ]}>
          {item.nome}
        </Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <View style={{ 
            backgroundColor: isTitular ? 'rgba(37, 99, 235, 0.08)' : 'rgba(100, 116, 139, 0.08)', 
            paddingHorizontal: 8, 
            paddingVertical: 2, 
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <MaterialCommunityIcons 
              name={isTitular ? "account-tie" : "account-arrow-right"} 
              size={12} 
              color={isTitular ? "#2563eb" : "#64748b"} 
            />
            <Text style={{ 
              color: isTitular ? '#2563eb' : '#64748b', 
              fontSize: 11, 
              fontWeight: '600', 
              marginLeft: 4 
            }}>
              {isTitular ? 'Titular' : 'Colaborador'}
            </Text>
          </View>
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