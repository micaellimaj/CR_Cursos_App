import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
}

export default function CustomInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  placeholderTextColor = '#aaa',
}: CustomInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor={placeholderTextColor}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: width * 0.9,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});