import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import LoginScreen from '../LoginScreen';
import HomeScreen from '../HomeScreen';
import Profilealuno from '../Profilealuno';
import CustomDrawerContent from './CustomDrawerContent';
import RegisterScreen from '../screens/RegisterScreen';
import AulasScreen from '../AulasScreen';
import ConteudoScreen from '../ConteudoScreen';
import Notas from '../Notas';
import TelaConteudos from '../TelaConteudos';
import Cursos from '../Cursos';
import profileexample from '../profileexample';
import Cadastro from 'screens/Cadastro';
import TermsOfUseScreen from 'TermosdeUso';
import ProfileProfessor from 'Profileprofessor'


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
        <Drawer.Screen name="Cadastro" component={Cadastro} />
        <Drawer.Screen name="TermosdeUso" component={TermsOfUseScreen} />

    </Drawer.Navigator>
  );
}