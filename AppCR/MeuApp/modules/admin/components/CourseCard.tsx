import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/CourseManagementStyles';

interface CourseCardProps {
  item: any;
  isLightTheme: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ item, isLightTheme, onEdit, onDelete }) => (
  <View style={[styles.courseCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
    <View style={styles.iconContainer}>
      <FontAwesome5 name="graduation-cap" size={18} color="#2563eb" />
    </View>

    <View style={styles.courseInfo}>
      <Text style={styles.courseCode}>{item.id?.substring(0, 8)}</Text>
      <Text style={[styles.courseName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
        {item.nome}
      </Text>
      <Text style={styles.subtitle} numberOfLines={2}>{item.descricao}</Text>
    </View>
    
    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.iconBtn} onPress={onEdit}>
        <Feather name="edit-2" size={18} color="#2563eb" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn} onPress={onDelete}>
        <Feather name="trash-2" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);