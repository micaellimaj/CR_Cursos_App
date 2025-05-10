import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface GoogleSignInButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

interface Styles {
  button: ViewStyle;
  buttonContent: ViewStyle;
  buttonText: TextStyle;
}

export default function GoogleSignInButton({ onPress, style }: GoogleSignInButtonProps) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.button, style]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <FontAwesome5 name="google" size={20} color="#DB4437" />
      <Text style={styles.buttonText}>
        Continuar com Google
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<Styles>({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#5f6368',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});