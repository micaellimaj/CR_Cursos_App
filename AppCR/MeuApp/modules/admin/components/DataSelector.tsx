import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/SubjectManagementStyles';

interface DataSelectorProps {
  label: string;
  data: any[];
  selectedId: string;
  onSelect: (id: string) => void;
  displayField: string;
  isLightTheme: boolean;
  labelColor: string;
  inputBg: string;
}

export const DataSelector: React.FC<DataSelectorProps> = ({
  label, data, selectedId, onSelect, displayField, isLightTheme, labelColor, inputBg
}) => {
  const containerStyle = {
    backgroundColor: inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isLightTheme ? '#e2e8f0' : '#334155',
    overflow: 'hidden' as const,
  };

  const optionStyle = (isSelected: boolean) => ({
    padding: 12,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    backgroundColor: isSelected ? (isLightTheme ? '#eff6ff' : '#1e293b') : 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: isLightTheme ? '#f1f5f9' : '#334155',
  });

  return (
    <View style={styles.inputGroup}>
      <Text style={[styles.inputLabel, { color: labelColor }]}>{label}</Text>
      <View style={containerStyle}>
        <ScrollView style={{ maxHeight: 120 }} nestedScrollEnabled>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={optionStyle(selectedId === item.id)}
              onPress={() => onSelect(item.id)}
            >
              <Text style={{ color: isLightTheme ? '#000' : '#fff' }}>
                {item[displayField]}
              </Text>
              {selectedId === item.id && (
                <Ionicons name="checkmark-circle" size={18} color="#2563eb" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};