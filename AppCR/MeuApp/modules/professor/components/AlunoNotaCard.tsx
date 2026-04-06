import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IAlunoTurma, INota } from '../types';
import styles from '../styles/MyTurmasStyles';

interface AlunoNotaCardProps {
  item: IAlunoTurma;
  notaExistente?: INota;
  inputValue: string;
  isLightTheme: boolean;
  onInputChange: (value: string) => void;
  onCriar: () => void;
  onEdit: (nota: INota) => void;
  onDelete: (id: string) => void;
}

export const AlunoNotaCard: React.FC<AlunoNotaCardProps> = ({
  item, notaExistente, inputValue, isLightTheme, onInputChange, onCriar, onEdit, onDelete
}) => {
  return (
    <View style={[styles.subjectCard, { 
      backgroundColor: isLightTheme ? '#fff' : '#1e293b',
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isLightTheme ? '#e2e8f0' : '#334155',
      elevation: 0,
      flexDirection: 'row',
      alignItems: 'center'
    }]}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: isLightTheme ? '#1e293b' : '#fff', fontSize: 15, fontWeight: 'bold' }}>
          {item.full_name}
        </Text>
        <Text style={{ 
          fontSize: 12, 
          color: notaExistente ? '#2563eb' : '#94a3b8', 
          marginTop: 4, 
          fontWeight: notaExistente ? '600' : '400' 
        }}>
          {notaExistente ? `Lançada: ${notaExistente.valor || notaExistente.nota}` : 'Aguardando nota'}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
        {!notaExistente ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="0.0"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={inputValue}
              onChangeText={onInputChange}
              style={{ 
                width: 55, height: 42,
                borderWidth: 1.5, borderColor: isLightTheme ? '#e2e8f0' : '#475569',
                borderRadius: 8, color: isLightTheme ? '#000' : '#fff', 
                textAlign: 'center', marginRight: 10, 
                backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a'
              }}
            />
            <TouchableOpacity onPress={onCriar}>
              <MaterialCommunityIcons name="check-circle" size={38} color="#2563eb" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => onEdit(notaExistente)} style={{ padding: 8, marginRight: 6 }}>
              <MaterialCommunityIcons name="square-edit-outline" size={26} color="#2563eb" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(notaExistente.id!)} style={{ padding: 8 }}>
              <MaterialCommunityIcons name="trash-can-outline" size={26} color="#ef4444" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};