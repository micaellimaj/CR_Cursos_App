import React from 'react';
import { View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/CourseManagementStyles';

interface SearchInputProps {
  placeholder?: string;
  isLightTheme: boolean;
  onChangeText?: (text: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Pesquisar...", isLightTheme, onChangeText }) => (
  <View style={[styles.searchBar, { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }]}>
    <Feather name="search" size={20} color="#94a3b8" />
    <TextInput 
      placeholder={placeholder} 
      style={[styles.searchInput, { color: isLightTheme ? '#1e293b' : '#fff' }]} 
      placeholderTextColor="#94a3b8" 
      onChangeText={onChangeText}
    />
  </View>
);