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
import ProfileAdminScreen from '../modules/admin/screens/ProfileAdminScreen';
import MyDisciplinasScreen from '../modules/professor/screens/MyDisciplinasScreen';
import DisciplinaDetailScreen from '../modules/professor/screens/DisciplinaDetailScreen';
import ConteudoProfessorScreen from '../modules/professor/screens/ConteudoScreen';
import AtividadeProfessorScreen from '../modules/professor/screens/AtividadeProfessorScreen';
import TurmaDetailScreen from 'modules/professor/screens/TurmaDetailScreen';
import MyTurmasScreen from '../modules/professor/screens/MyTurmasScreen';
import FrequenciaChamadaScreen from 'modules/professor/screens/FrequenciaChamadaScreen';
import NotasLancamentoScreen from 'modules/professor/screens/NotasLancamentoScreen';
import { useAuth } from '../contexts/AuthContext'; 
import AdminTabNavigator from './AdminTabNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const userType = user?.tipo;
  
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
      {!user ? (
        <Drawer.Screen name="Login" component={LoginScreen} />
      ) : (
        <></>
      )}

      {/* ROTAS DE ALUNO: Só existem se for Aluno ou Admin */}
      {(userType === 'aluno' ) && (
        <>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profilealuno" component={Profilealuno} />
          <Drawer.Screen name="AulasScreen" component={AulasScreen} />
          <Drawer.Screen name="Notas" component={Notas} />
          <Drawer.Screen name="TelaConteudos" component={TelaConteudos} />
          <Drawer.Screen name="Cursos" component={Cursos} />
          <Drawer.Screen name="ConteudoScreen" component={ConteudoScreen} />
          {/* Adicione as outras telas de aluno aqui */}
        </>
      )}

      {/* ROTAS DE PROFESSOR: Só existem se for Professor ou Admin */}
      {(userType === 'professor') && (
        <>
          <Drawer.Screen 
            name="ProfileProfessor" 
            component={ProfileProfessor} 
            options={{ title: 'Meu Perfil' }}
          />
          <Drawer.Screen 
            name="MyDisciplinas" 
            component={MyDisciplinasScreen} 
            options={{ title: 'Minhas Disciplinas' }}
          />
           <Drawer.Screen 
            name="MyTurmas" 
            component={MyTurmasScreen} 
            options={{ title: 'Minhas Turmas' }}
          />
          
          {/* TELAS DE APOIO (Ocultas no Drawer via DrawerItem, mas registradas no Navigator) */}
          <Drawer.Screen 
            name="DisciplinaDetail" 
            component={DisciplinaDetailScreen} 
            options={{ title: 'Detalhes da Disciplina' }}
          />
          <Drawer.Screen 
            name="ConteudoProfessor" 
            component={ConteudoProfessorScreen} 
            options={{ title: 'Conteúdos' }}
          />
          <Drawer.Screen 
            name="AtividadeProfessor" 
            component={AtividadeProfessorScreen} 
            options={{ title: 'Atividades' }}
          />
          <Drawer.Screen 
            name="TurmaDetail" 
            component={TurmaDetailScreen} 
            options={{ title: 'Detalhes da Turma' }}
          
          />
          <Drawer.Screen 
            name="FrequenciaChamada" 
            component={FrequenciaChamadaScreen} 
            options={{ title: 'Frequência e Chamada' }}
          />
          <Drawer.Screen 
            name="NotasLancamento" 
            component={NotasLancamentoScreen} 
            options={{ title: 'Lançamento de Notas' }}
          />
          
        </>
      )}

      {/* ROTAS DE ADMIN: Só existem na memória se o tipo for admin */}
      {userType === 'admin' && (
        <>
          <Drawer.Screen 
            name="AdminHome" 
            component={AdminTabNavigator} 
            options={{ title: 'Painel Administrativo' }}
          />
          <Drawer.Screen 
            name="ProfileAdmin" 
            component={ProfileAdminScreen} 
            options={{ title: 'Painel Administrativo' }}
          />
        </>
      )}

      <Drawer.Screen name="TermosdeUso" component={TermsOfUseScreen} />
    </Drawer.Navigator>
  );
}