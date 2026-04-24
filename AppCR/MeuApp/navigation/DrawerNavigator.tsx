import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import LoginScreen from '../modules/auth/screens/LoginScreen';
import CustomDrawerContent from './CustomDrawerContent';
import RegisterScreen from '../modules/admin/screens/UsuarioManagementScreen';
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
import DisciplinaMateriaisScreen from 'modules/professor/screens/DisciplinaMateriaisScreen';
import ClasseScreen from 'modules/professor/screens/ClasseScreen';
import PrivadoScreen from 'modules/professor/screens/PrivadoScreen';
import ProfileAlunoScreen from 'modules/aluno/screens/ProfileAlunoScreen';
import CursosScreen from 'modules/aluno/screens/CursosScreen';
import DisciplinasAlunoScreen from 'modules/aluno/screens/DisciplinasAlunoScreen';
import DisciplinaDetailAluno from 'modules/aluno/screens/DisciplinaDetailScreen';
import ConteudoAlunoScreen from '../modules/aluno/screens/ConteudoAlunoScreen';
import AtividadeAlunoScreen from '../modules/aluno/screens/AtividadeAlunoScreen';
import NotasAlunoScreen from '../modules/aluno/screens/NotasAlunoScreen';
import ProfessorTabNavigator from './ProfessorTabNavigator';
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
      {/* ROTAS DE ALUNO: Só existem se for Aluno */}
      {(userType === 'aluno') && (
        <>
          <Drawer.Screen 
            name="ProfileAluno" 
            component={ProfileAlunoScreen} 
            options={{ title: 'Meu Perfil' }}
          />
          <Drawer.Screen 
            name="Cursos" 
            component={CursosScreen} 
            options={{ title: 'Meus Cursos' }}
          />
          {/* Registre DisciplinasAluno aqui para poder navegar até ela, 
              mesmo que não queira que ela apareça no menu lateral */}
          <Drawer.Screen 
            name="DisciplinasAluno" 
            component={DisciplinasAlunoScreen} 
            options={{ title: 'Disciplinas' }}
          />
          <Drawer.Screen 
            name="DisciplinaDetailAluno" // Mudei o name para evitar conflito de navegação
            component={DisciplinaDetailAluno} 
            options={{ title: 'Detalhes da Disciplina' }}
          />
          <Drawer.Screen 
            name="ConteudoAluno" // Este é o nome que deve bater com o screen do seu array
            component={ConteudoAlunoScreen} 
            options={{ title: 'Materiais de Estudo' }}
          />
          <Drawer.Screen
            name="AtividadeAluno"
            component={AtividadeAlunoScreen}
            options={{ title: 'Minhas Atividades' }}
            />
            <Drawer.Screen 
              name="NotasAluno" 
              component={NotasAlunoScreen} 
              options={{ title: 'Meu Desempenho' }}
            />
        </>
      )}

            {/* ROTAS DE PROFESSOR: Só existem se for Professor ou Admin */}
      {(userType === 'professor') && (
        <>
          {/* Tela Principal com Tabs */}
          <Drawer.Screen 
            name="ProfessorHome" 
            component={ProfessorTabNavigator} 
            options={{ title: 'Área do Professor' }}
          />
          <Drawer.Screen name="ProfileProfessor" component={ProfileProfessor} options={{ title: 'Perfil do Professor' }} />

          {/* TELAS DE APOIO (Continuam no Drawer para navegação via Stack, mas não precisam estar no Tab) */}
          <Drawer.Screen name="DisciplinaDetail" component={DisciplinaDetailScreen} />
          <Drawer.Screen name="TurmaDetail" component={TurmaDetailScreen} />
          <Drawer.Screen name="DisciplinaMateriais" component={DisciplinaMateriaisScreen} />
          <Drawer.Screen name="FrequenciaChamada" component={FrequenciaChamadaScreen} />
          <Drawer.Screen name="NotasLancamento" component={NotasLancamentoScreen} />
          <Drawer.Screen name="ConteudoProfessor" component={ConteudoProfessorScreen} />
          <Drawer.Screen name="AtividadeProfessor" component={AtividadeProfessorScreen} />
          {/* Adicione outras sub-telas aqui se necessário */}
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