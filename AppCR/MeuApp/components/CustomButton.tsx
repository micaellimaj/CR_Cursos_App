import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // Agora o TS aceita essa prop
  loading?: boolean;  // Opcional: para mostrar um spinner dentro do botão
}

export default function CustomButton({ title, onPress, disabled, loading }: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        (disabled || loading) && styles.buttonDisabled 
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.9,
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});