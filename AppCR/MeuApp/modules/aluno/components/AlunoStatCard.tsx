import React from 'react';
import { View, Text } from 'react-native';
import { getDashboardAlunoStyles } from '../styles/DashboardAlunoStyles'; // Nome atualizado

interface AlunoStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  theme: 'light' | 'dark';
}

export const AlunoStatCard: React.FC<AlunoStatCardProps> = ({ label, value, icon, theme }) => {
  const styles = getDashboardAlunoStyles(theme); // Nome atualizado
  const isLight = theme === 'light';

  return (
    <View style={[styles.statGridCard, { backgroundColor: isLight ? '#fff' : '#1e293b' }]}>
      <View style={styles.iconCircle}>
        {icon}
      </View>
      <Text style={[styles.statNumber, { color: isLight ? '#1e3a8a' : '#fff' }]}>
        {value}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};