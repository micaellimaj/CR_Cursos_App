import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { IClasse } from '../types';
import styles from '../styles/ClasseAlunoStyles';

interface ClasseAlunoCardProps {
  item: IClasse;
  textColor: string;
  cardBg: string;
  borderColor: string;
}

export const ClasseAlunoCard: React.FC<ClasseAlunoCardProps> = ({
  item,
  textColor,
  cardBg,
  borderColor,
}) => {
  
  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case 'aviso': return 'bell-outline';
      case 'material': return 'file-document-outline';
      case 'aula': return 'video-outline';
      default: return 'post-outline';
    }
  };

  return (
    <View style={[styles.cardConteudo, { backgroundColor: cardBg, borderColor: borderColor }]}>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <MaterialCommunityIcons 
            name={getIconByTipo(item.tipo)} 
            size={20} 
            color="#2563eb" 
            style={{ marginRight: 8 }} 
          />
          <Text style={[styles.tipoBadge, { backgroundColor: '#2563eb15', color: '#2563eb' }]}>
            {item.tipo.toUpperCase()}
          </Text>
        </View>

        <Text style={[styles.nomeConteudo, { color: textColor }]}>{item.titulo}</Text>
        
        {item.descricao ? (
          <Text style={{ color: '#64748b', fontSize: 14, marginBottom: 12 }} numberOfLines={3}>
            {item.descricao}
          </Text>
        ) : null}

        {item.anexos && item.anexos.length > 0 && (
          <View style={styles.anexosContainer}>
            {item.anexos.map((anexo, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.anexoItem}
                onPress={() => Linking.openURL(anexo.url)}
              >
                <Feather name="paperclip" size={14} color="#2563eb" />
                <Text style={styles.anexoText} numberOfLines={1}>{anexo.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};