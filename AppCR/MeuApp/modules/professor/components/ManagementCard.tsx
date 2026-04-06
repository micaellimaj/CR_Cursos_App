import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/MyDisciplinasStyles';

interface ManagementCardProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
  isLightTheme: boolean;
  customStyle?: ViewStyle;
}

export const ManagementCard: React.FC<ManagementCardProps> = ({
  title, icon, color, onPress, isLightTheme, customStyle
}) => {
  const cardStyle = {
    ...styles.subjectCard,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 1,
    borderColor: isLightTheme ? '#e2e8f0' : '#334155',
    backgroundColor: isLightTheme ? '#fff' : '#1e293b',
    ...customStyle,
  };

  return (
    <TouchableOpacity style={cardStyle as any} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={32} color={color} />
      <Text style={[
        styles.subjectName, 
        { marginTop: 10, fontSize: 14, color: isLightTheme ? '#1e293b' : '#fff' }
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};