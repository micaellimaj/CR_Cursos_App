import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import MyDisciplinasScreen from '../modules/professor/screens/MyDisciplinasScreen';
import MyTurmasScreen from '../modules/professor/screens/MyTurmasScreen';
import ClasseScreen from '../modules/professor/screens/ClasseScreen';
import PrivadoScreen from '../modules/professor/screens/PrivadoScreen';
import ProfessorHomeScreen from 'modules/professor/screens/ProfessorHomeScreen';

const Tab = createBottomTabNavigator();

export default function ProfessorTabNavigator() {
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

          if (route.name === 'Dashboard') iconName = 'view-dashboard-variant';
          if (route.name === 'Disciplinas') iconName = 'book-open-variant';
          else if (route.name === 'Turmas') iconName = 'account-group';
          else if (route.name === 'Mural') iconName = 'bulletin-board';
          else iconName = 'message-text-outline';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={ProfessorHomeScreen} />
      <Tab.Screen name="Disciplinas" component={MyDisciplinasScreen} />
      <Tab.Screen name="Turmas" component={MyTurmasScreen} />
      <Tab.Screen name="Mural" component={ClasseScreen} />
      <Tab.Screen name="Mensagens" component={PrivadoScreen} />
    </Tab.Navigator>
  );
}