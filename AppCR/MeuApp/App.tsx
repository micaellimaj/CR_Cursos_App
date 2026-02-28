import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { View, ActivityIndicator, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import styles from './styles/AppStyles'; 
import DrawerNavigator from './navigation/DrawerNavigator';

// Mantém a tela de splash visível até mandarmos esconder
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Carrega as fontes
        await Font.loadAsync({
          Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        });
        // Simula o delay de 1 segundo que você queria
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Função que esconde a Splash Screen quando o container principal for montado
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>
          Espere um pouquinho...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}