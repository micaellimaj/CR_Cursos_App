import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import LoginScreen from '../modules/auth/screens/LoginScreen';
import HomeScreen from '../modules/aluno/screens/HomeScreen';
import Profilealuno from '../modules/aluno/screens/Profilealuno';
import CustomDrawerContent from './CustomDrawerContent';
import RegisterScreen from '../modules/admin/screens/UsuarioManagementScreen';
import AulasScreen from '../modules/aluno/screens/AulasScreen';
import ConteudoScreen from '../modules/aluno/screens/ConteudoScreen';
import Notas from '../modules/aluno/screens/Notas';
import TelaConteudos from '../modules/aluno/screens/TelaConteudos';
import Cursos from '../modules/aluno/screens/Cursos';
import TermsOfUseScreen from '../modules/auth/screens/TermosdeUso';
import ProfileProfessor from '../modules/professor/screens/Profileprofessor'
import AdminHomeScreen from '../modules/admin/screens/AdminHomeScreen';
import CourseManagementScreen from '../modules/admin/screens/CourseManagementScreen';
import SubjectManagementScreen from '../modules/admin/screens/SubjectManagementScreen';
import ClassManagementScreen from '../modules/admin/screens/ClassManagementScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useTheme();
  
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme === 'light' ? '#f5f7fa' : '#0f172a',
        },
        headerTintColor: theme === 'light' ? '#333' : '#e2e8f0',
        drawerStyle: {
          backgroundColor: theme === 'light' ? '#f5f7fa' : '#0f172a',
        },
      }}
    >
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profilealuno" component={Profilealuno} />
      <Drawer.Screen name="ProfileProfessor" component={ProfileProfessor} />
       <Drawer.Screen name="AulasScreen" component={AulasScreen} />
       <Drawer.Screen name="ConteudoScreen" component={ConteudoScreen} />
       <Drawer.Screen name="Notas" component={Notas} />
       <Drawer.Screen name="TelaConteudos" component={TelaConteudos} />
       <Drawer.Screen name="Cursos" component={Cursos} />
       <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
        <Drawer.Screen name="TermosdeUso" component={TermsOfUseScreen} />
        <Drawer.Screen name="AdminHome" component={AdminHomeScreen} />
        <Drawer.Screen name="CourseManagement" component={CourseManagementScreen} />
        <Drawer.Screen name="SubjectManagement" component={SubjectManagementScreen} />
        <Drawer.Screen name="ClassManagement" component={ClassManagementScreen} />
    </Drawer.Navigator>
  );
}