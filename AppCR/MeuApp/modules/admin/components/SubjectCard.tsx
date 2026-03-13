import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from '../styles/SubjectManagementStyles';

interface SubjectCardProps {
  item: any;
  cursoNome: string;
  isLightTheme: boolean;
  onAssoc: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ 
  item, cursoNome, isLightTheme, onAssoc, onEdit, onDelete 
}) => (
  <View style={[styles.subjectCard, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
    <View style={styles.iconContainer}>
      <Ionicons name="book-outline" size={22} color="#2563eb" />
    </View>
    
    <View style={styles.subjectInfo}>
      <View style={styles.subjectHeader}>
        <Text style={[styles.subjectName, { color: isLightTheme ? '#1e3a8a' : '#fff' }]}>
          {item.nome}
        </Text>
        <Text style={styles.subjectCode}>{item.id?.substring(0, 5)}</Text>
      </View>
      <Text style={styles.courseTag}>
        <Ionicons name="school-outline" size={12}/> {cursoNome}
      </Text>
      
      <View style={styles.tagRow}>
        <View style={[styles.infoTag, { backgroundColor: isLightTheme ? '#f1f5f9' : '#2d3748' }]}>
          <Ionicons name="people-outline" size={12} color="#475569" />
          <Text style={styles.tagText}>{item.turmasAssociadas?.length || 0} Turmas</Text>
        </View>
      </View>
    </View>

    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.iconBtn} onPress={onAssoc}>
        <Ionicons name="git-network-outline" size={20} color={isLightTheme ? "#050707" : "#fff"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn} onPress={onEdit}>
        <Feather name="edit-2" size={18} color="#2563eb" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn} onPress={onDelete}>
        <Feather name="trash-2" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);