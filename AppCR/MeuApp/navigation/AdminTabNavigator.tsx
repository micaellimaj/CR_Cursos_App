import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

// Importação das Telas
import AdminHomeScreen from '../modules/admin/screens/AdminHomeScreen';
import RegisterScreen from '../modules/admin/screens/UsuarioManagementScreen';
import CourseManagementScreen from '../modules/admin/screens/CourseManagementScreen';
import SubjectManagementScreen from '../modules/admin/screens/SubjectManagementScreen';
import ClassManagementScreen from '../modules/admin/screens/ClassManagementScreen';

const Tab = createBottomTabNavigator();

export default function AdminTabNavigator() {
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
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        // Tipagem adicionada aqui para resolver o erro 7031
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Início') iconName = 'home-outline';
          else if (route.name === 'Usuários') iconName = 'person-add-outline';
          else if (route.name === 'Cursos') iconName = 'school-outline';
          else if (route.name === 'Disciplinas') iconName = 'book-outline';
          else iconName = 'people-outline'; // Turmas

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={AdminHomeScreen} />
      <Tab.Screen name="Usuários" component={RegisterScreen} />
      <Tab.Screen name="Cursos" component={CourseManagementScreen} />
      <Tab.Screen name="Disciplinas" component={SubjectManagementScreen} />
      <Tab.Screen name="Turmas" component={ClassManagementScreen} />
    </Tab.Navigator>
  );
}