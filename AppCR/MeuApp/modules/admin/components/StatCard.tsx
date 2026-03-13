import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles/AdminHomeStyles';

interface StatCardProps {
  label: string;
  value: number;
  loading: boolean;
  icon: React.ReactNode;
  cardBg: string;
  titleColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  loading, 
  icon, 
  cardBg, 
  titleColor 
}) => {
  return (
    <View style={[styles.statGridCard, { backgroundColor: cardBg }]}>
      <View style={styles.iconCircle}>
        {icon}
      </View>
      
      {loading ? (
        <ActivityIndicator size="small" color="#2563eb" />
      ) : (
        <Text style={[styles.statNumber, { color: titleColor }]}>{value}</Text>
      )}
      
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};