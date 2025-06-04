import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import { View, ActivityIndicator, Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import styles from './styles/AppStyles'; // Importando os estilos
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Carrega a fonte Poppins
  const loadFonts = async () => {
    await Font.loadAsync({
      Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 segundos de delay para simular carregamento

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" style={styles.loadingIndicator} />
        <Text style={styles.loadingText}>
          Espere um pouquinho, estamos{"\n"}
          preparando tudo pra você curtir{"\n"}
          o app!
        </Text>
      </View>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}