import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import styles from '../styles/UsuarioManagementStyles';

interface UserCardProps {
  item: any;
  turmaNome: string;
  textColor: string;
  cardBg: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ item, turmaNome, textColor, cardBg, onEdit, onDelete }) => (
  <View style={[styles.userCard, { backgroundColor: cardBg }]}>
    <View style={styles.iconContainer}>
      <Ionicons name="person-outline" size={22} color="#2563eb" />
    </View>

    <View style={styles.userInfo}>
      <Text style={styles.userBadge}>{turmaNome}</Text>
      <Text style={[styles.userName, { color: textColor }]}>{item.full_name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>

    <View style={styles.actionButtons}>
      <TouchableOpacity style={styles.iconBtn} onPress={onEdit}>
        <Feather name="edit-2" size={18} color="#2563eb" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtn} onPress={onDelete}>
        <Feather name="trash-2" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);