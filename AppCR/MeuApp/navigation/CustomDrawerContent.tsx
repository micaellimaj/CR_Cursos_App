import React from 'react';
import { View, StyleSheet, Image, Text, ViewStyle, TextStyle, ImageStyle, Linking } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useTheme } from '../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  FontAwesome5, 
  MaterialIcons, 
  Ionicons,
  SimpleLineIcons 
} from '@expo/vector-icons';

// Define interface for styles
interface Styles {
  container: ViewStyle;
  headerGradient: ViewStyle;
  headerContent: ViewStyle;
  logo: ImageStyle;
  headerTitle: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  drawerItem: ViewStyle;
  drawerLabel: TextStyle;
}

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme, toggleTheme } = useTheme();

  const handleSocialMediaPress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };
  
  return (
    <DrawerContentScrollView 
      {...props}
      style={[
        styles.container,
        { backgroundColor: theme === 'light' ? '#f8fafc' : '#1a202c' }
      ]}
    >
      {/* Header com Gradient */}
      <LinearGradient
        colors={theme === 'light' ? ['#4a90e2', '#357abd'] : ['#1a365d', '#2d3748']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>CR Cursos</Text>
        </View>
      </LinearGradient>

      {/* Seção de Autenticação */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}>
          AUTENTICAÇÃO
        </Text>
        
        <DrawerItem
          label="Login"
          icon={({ color, size }) => (
            <Icon name="login" size={size} color={theme === 'light' ? '#4a90e2' : '#63b3ed'} />
          )}
          onPress={() => props.navigation.navigate('Login')}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}
        />

        <DrawerItem
          label="Cadastro"
          icon={({ color, size }) => (
            <Icon name="person-add" size={size} color={theme === 'light' ? '#4a90e2' : '#63b3ed'} />
          )}
          onPress={() => props.navigation.navigate('Register')}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}
        />
      </View>

      {/* Seção de Navegação */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}>
          NAVEGAÇÃO
        </Text>
        
        <DrawerItem
          label="Home"
          icon={({ color, size }) => (
            <Icon name="home" size={size} color={theme === 'light' ? '#4a90e2' : '#63b3ed'} />
          )}
          onPress={() => props.navigation.navigate('Home')}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}
        />
      </View>

      {/* Seção de Configurações */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}>
          CONFIGURAÇÕES
        </Text>

        <DrawerItem
    label="Configurações"
    icon={({ size }) => (
      <Ionicons
        name="settings-sharp"
        size={size}
        color={theme === 'light' ? '#4a90e2' : '#63b3ed'}
      />
    )}
    onPress={() => props.navigation.navigate('Settings')}
    style={styles.drawerItem}
    labelStyle={[styles.drawerLabel, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}
  />
        
        <DrawerItem
          label="Alternar Tema"
          icon={({ size }) => (
            <Icon
              name={theme === 'light' ? 'dark-mode' : 'light-mode'}
              size={size}
              color={theme === 'light' ? '#4a90e2' : '#63b3ed'}
            />
          )}
          onPress={toggleTheme}
          style={styles.drawerItem}
          labelStyle={[styles.drawerLabel, { color: theme === 'light' ? '#2d3748' : '#e2e8f0' }]}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  headerGradient: {
    padding: 16,
    marginBottom: 8,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  section: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 16,
    marginVertical: 8,
  },
  drawerItem: {
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  drawerLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});