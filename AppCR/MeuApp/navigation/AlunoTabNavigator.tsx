import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Importações das telas do Aluno
import AlunoHomeScreen from '../modules/aluno/screens/AlunoHomeScreen';
import CursosScreen from '../modules/aluno/screens/CursosScreen';
import ClasseAlunoScreen from '../modules/aluno/screens/ClasseAlunoScreen';
import PrivadoAlunoScreen from '../modules/aluno/screens/PrivadoAlunoScreen';
import FrequenciaAlunoScreen from '../modules/aluno/screens/FrequenciaAlunoScreen';

const Tab = createBottomTabNavigator();

export default function AlunoTabNavigator() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isLightTheme ? '#fff' : '#0f172a',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialCommunityIcons.glyphMap;

          switch (route.name) {
            case 'Início': iconName = 'home-variant'; break;
            case 'Cursos': iconName = 'school-outline'; break;
            case 'Mural': iconName = 'google-classroom'; break;
            case 'Frequência': iconName = 'clipboard-check-outline'; break;
            case 'Mensagens': iconName = 'chat-processing-outline'; break;
            default: iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={AlunoHomeScreen} />
      <Tab.Screen name="Cursos" component={CursosScreen} />
      <Tab.Screen name="Mural" component={ClasseAlunoScreen} />
      <Tab.Screen name="Frequência" component={FrequenciaAlunoScreen} />
      <Tab.Screen name="Mensagens" component={PrivadoAlunoScreen} />
    </Tab.Navigator>
  );
}