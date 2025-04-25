import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';

export default function HomeScreen() {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>Bem-vindo!</Text>
        <Text style={globalStyles.headerSubtitle}>
          Esta é a tela inicial do seu aplicativo
        </Text>
      </View>

      <View style={globalStyles.body}>
        <Text style={globalStyles.title}>
          🏠 Home
        </Text>
      </View>

      <View style={globalStyles.footer}>
        <Text style={globalStyles.footerText}>
          Desenvolvido por CR Cursos Educacional
        </Text>
      </View>
    </View>
  );
}