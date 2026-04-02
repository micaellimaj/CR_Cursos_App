import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
  inputBg: string;
  textColor: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  label, value, onChangeText, placeholder, required, secureTextEntry, 
  keyboardType, autoCapitalize, inputBg, textColor, multiline
}) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 6, color: textColor }}>
      {label} {required ? <Text style={{ color: '#ef4444' }}>*</Text> : <Text style={{ fontSize: 10, fontWeight: 'normal', color: '#94a3b8' }}>(Opcional)</Text>}
    </Text>
    <TextInput
      style={{
        backgroundColor: inputBg,
        color: textColor,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        fontSize: 16
      }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94a3b8"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
    />
  </View>
);