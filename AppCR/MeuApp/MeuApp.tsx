import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Profilealuno from './Profilealuno';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function MeuApp() {
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const storedType = await AsyncStorage.getItem('userType');
        setUserType(storedType);
      } catch (error) {
        console.error('Erro ao buscar tipo do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserType();
  }, []);

  if (isLoading) return null; // ou um SplashScreen

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Início" component={HomeScreen} />

        {userType === 'aluno' && (
          <Stack.Screen name="Profile" component={Profilealuno} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
