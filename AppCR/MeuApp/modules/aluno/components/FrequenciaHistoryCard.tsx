import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IFrequencia } from '../types';
import { getFrequenciaAlunoStyles } from '../styles/FrequenciaAlunoStyles';

interface Props {
  item: IFrequencia;
  theme: 'light' | 'dark';
}

export const FrequenciaHistoryCard: React.FC<Props> = ({ item, theme }) => {
  const styles = getFrequenciaAlunoStyles(theme);
  const isPresent = item.status;

  return (
    <View style={styles.historyCard}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.data}</Text>
        {item.observacao && <Text style={styles.obsText}>{item.observacao}</Text>}
      </View>

      <View style={[
        styles.statusBadge, 
        { backgroundColor: isPresent ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)' }
      ]}>
        <MaterialCommunityIcons 
          name={isPresent ? "check-circle" : "close-circle"} 
          size={14} 
          color={isPresent ? "#059669" : "#dc2626"} 
        />
        <Text style={{ 
          fontSize: 12, 
          fontWeight: 'bold', 
          color: isPresent ? "#059669" : "#dc2626" 
        }}>
          {isPresent ? "Presente" : "Falta"}
        </Text>
      </View>
    </View>
  );
};