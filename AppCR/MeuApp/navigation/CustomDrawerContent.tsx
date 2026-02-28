import React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from '../styles/CustomDrawerStyles';
import { useAuth } from '../contexts/AuthContext';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  
  const isLightTheme = theme === 'light';
  const iconColor = isLightTheme ? '#4a90e2' : '#63b3ed';
  const labelColor = isLightTheme ? '#2d3748' : '#e2e8f0';

  const userType = user?.tipo;

  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  return (
    <DrawerContentScrollView 
      {...props}
      style={[styles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#1a202c' }]}
    >
      {/* HEADER */}
      <LinearGradient
        colors={isLightTheme ? ['#4a90e2', '#357abd'] : ['#1a365d', '#2d3748']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.headerTitle}>CR Cursos</Text>
          {user && (
            <Text style={{ color: '#fff', fontSize: 12, marginTop: 5 }}>
              Olá, {user.nome}
            </Text>
          )}
        </View>
      </LinearGradient>

      {/* SEÇÃO: AUTENTICAÇÃO */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: labelColor }]}>CONTA</Text>
        {!user ? (
          <DrawerItem
            label="Entrar"
            icon={({ size }) => <MaterialIcons name="login" size={size} color={iconColor} />}
            onPress={() => props.navigation.navigate('Login')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
        ) : (
          <DrawerItem 
            label="Sair" 
            icon={({ size }) => <MaterialIcons name="logout" size={size} color="#f56565" />}
            onPress={() => {
              logout();
            }} 
            labelStyle={{ color: '#f56565' }}
          />
        )}
      </View>

      {/* SEÇÃO: ALUNO - Visível para Alunos e Admin */}
      {(userType === 'aluno' ) && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: labelColor }]}>ÁREA DO ALUNO</Text>
          <DrawerItem 
            label="Início Aluno" 
            icon={({ size }) => <Ionicons name="home" size={size} color={iconColor} />}
            onPress={() => props.navigation.navigate('Home')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
          <DrawerItem 
            label="Meu Perfil" 
            icon={({ size }) => <Ionicons name="person-circle" size={size} color={iconColor} />}
            onPress={() => props.navigation.navigate('Profilealuno')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
          
        </View>
      )}

      {/* SEÇÃO: PROFESSOR - Visível para Professor e Admin */}
      {(userType === 'professor') && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: labelColor }]}>ÁREA DO PROFESSOR</Text>
          <DrawerItem 
            label="Perfil Professor" 
            icon={({ size }) => <FontAwesome5 name="chalkboard-teacher" size={size-4} color={iconColor} />}
            onPress={() => props.navigation.navigate('ProfileProfessor')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
        </View>
      )}

      {/* SEÇÃO: ADMINISTRADOR - SÓ para Admin */}
      {userType === 'admin' && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: labelColor }]}>ADMINISTRAÇÃO</Text>
          <DrawerItem 
            label="Painel Admin" 
            icon={({ size }) => <MaterialIcons name="dashboard" size={size} color={iconColor} />}
            onPress={() => props.navigation.navigate('AdminHome')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
          <DrawerItem 
            label="Gerenciar Usuários" 
            icon={({ size }) => <MaterialIcons name="person-add" size={size} color={iconColor} />}
            onPress={() => props.navigation.navigate('UsuarioManagementScreen')}
            style={styles.drawerItem}
            labelStyle={[styles.drawerLabel, { color: labelColor }]}
          />
        </View>
      )}

      {/* SEÇÃO: CONFIGURAÇÕES (Sempre visível) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: labelColor }]}>CONFIGURAÇÕES</Text>
        <DrawerItem
          label={isLightTheme ? "Modo Escuro" : "Modo Claro"}
          icon={({ size }) => (
            <MaterialIcons name={isLightTheme ? 'dark-mode' : 'light-mode'} size={size} color={iconColor} />
          )}
          onPress={toggleTheme}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: labelColor }]}
        />
        <DrawerItem
          label="Suporte WhatsApp"
          icon={({ size }) => <FontAwesome5 name="whatsapp" size={size} color="#25D366" />}
          onPress={() => handleSocialMediaPress('https://wa.me/5581993494152')}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: labelColor }]}
        />
      </View>
    </DrawerContentScrollView>
  );
}