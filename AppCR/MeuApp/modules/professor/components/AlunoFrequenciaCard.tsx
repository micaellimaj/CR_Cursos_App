import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IFrequencia, IAlunoTurma } from '../types';

interface AlunoFrequenciaCardProps {
  item: IAlunoTurma;
  registroNaData?: IFrequencia;
  stats: { faltas: number };
  isLightTheme: boolean;
  onRegistrar: (alunoId: string, status: boolean) => void;
  onExcluir: (frequenciaId: string) => void;
}

export const AlunoFrequenciaCard: React.FC<AlunoFrequenciaCardProps> = ({
  item, registroNaData, stats, isLightTheme, onRegistrar, onExcluir
}) => {
  const statusColor = registroNaData ? (registroNaData.status ? '#059669' : '#dc2626') : '#94a3b8';

  return (
    <View style={{ 
      backgroundColor: isLightTheme ? '#fff' : '#1e293b',
      borderWidth: 1,
      borderColor: isLightTheme ? '#e2e8f0' : '#334155',
      padding: 16, marginBottom: 12, borderRadius: 12,
      flexDirection: 'row', alignItems: 'center'
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: isLightTheme ? '#1e293b' : '#fff', fontSize: 15, fontWeight: 'bold' }}>
          {item.full_name}
        </Text>
        
        <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center' }}>
          <View style={{ backgroundColor: isLightTheme ? '#f1f5f9' : '#0f172a', paddingHorizontal: 6, borderRadius: 4, marginRight: 8 }}>
             <Text style={{ fontSize: 10, color: '#64748b' }}>Histórico: {stats.faltas} faltas</Text>
          </View>
          <Text style={{ fontSize: 12, color: statusColor, fontWeight: '600' }}>
            {registroNaData ? (registroNaData.status ? '● Presente' : '● Falta') : '○ Pendente'}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!registroNaData ? (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => onRegistrar(item.id!, true)} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="check-circle-outline" size={32} color="#059669" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRegistrar(item.id!, false)}>
              <MaterialCommunityIcons name="close-circle-outline" size={32} color="#dc2626" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={() => {
              Alert.alert("Alterar", "Deseja excluir este registro?", [
                { text: "Cancelar" },
                { text: "Excluir", onPress: () => onExcluir(registroNaData.id!), style: 'destructive' }
              ])
            }}
            style={{ 
              backgroundColor: registroNaData.status ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)', 
              padding: 8, borderRadius: 8 
            }}
          >
            <MaterialCommunityIcons 
              name={registroNaData.status ? "check-bold" : "close-thick"} 
              size={22} 
              color={registroNaData.status ? "#059669" : "#dc2626"} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};