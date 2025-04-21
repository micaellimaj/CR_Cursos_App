import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './contexts/ThemeContext';
import DrawerNavigator from './navigation/DrawerNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}