import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { IPrivado } from '../types';
import { getPrivadoAlunoStyles } from '../styles/PrivadoAlunoStyles';

interface PrivadoAlunoCardProps {
  item: IPrivado;
  theme: 'light' | 'dark';
  nomeTurma: string; // O nome já tratado vem da Screen
}

export const PrivadoAlunoCard: React.FC<PrivadoAlunoCardProps> = ({ item, theme, nomeTurma }) => {
  const styles = getPrivadoAlunoStyles(theme);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.badgeTurma}>
          <Text style={styles.badgeText}>{nomeTurma}</Text>
        </View>
        <Text style={styles.dateText}>
          {item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : ''}
        </Text>
      </View>

      <Text style={styles.messageText}>{item.mensagem}</Text>

      {item.arquivos && item.arquivos.length > 0 && (
        <View style={styles.footer}>
          {item.arquivos.map((arq, idx) => (
            <TouchableOpacity 
              key={idx} 
              onPress={() => arq.url && Linking.openURL(arq.url)}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12 }}
            >
              <Feather name="paperclip" size={12} color="#2563eb" />
              <Text style={{ color: '#2563eb', fontSize: 13, marginLeft: 4 }}>{arq.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};