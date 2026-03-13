import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/ClassManagementStyles';

interface ClassCardProps {
  item: any;
  courseName: string;
  textColor: string;
  isLightTheme: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onEnroll: () => void;
  onSetTeacher: () => void;
}

export const ClassCard: React.FC<ClassCardProps> = ({ 
  item, courseName, textColor, isLightTheme, onEdit, onDelete, onEnroll, onSetTeacher 
}) => (
  <View style={[styles.classCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
    <View style={styles.classHeader}>
      <View style={styles.iconContainer}><FontAwesome5 name="users" size={18} color="#2563eb" /></View>
      <View style={styles.classMainInfo}>
        <Text style={[styles.className, { color: textColor }]}>{item.nome}</Text>
        <Text style={styles.classSubDetails}>Curso: {courseName}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onEdit}><Feather name="edit-2" size={18} color="#2563eb" style={{ marginRight: 15 }} /></TouchableOpacity>
        <TouchableOpacity onPress={onDelete}><Feather name="trash-2" size={18} color="#ef4444" /></TouchableOpacity>
      </View>
    </View>

    <View style={styles.manageButtons}>
      <TouchableOpacity style={styles.actionTextButton} onPress={onEnroll}>
        <Ionicons name="person-add-outline" size={14} color={textColor} />
        <Text style={[styles.actionText, {color: textColor}]}>Matricular</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionTextButton} onPress={onSetTeacher}>
        <Ionicons name="git-network-outline" size={14} color={textColor} />
        <Text style={[styles.actionText, {color: textColor}]}>Professor</Text>
      </TouchableOpacity>
    </View>
  </View>
);