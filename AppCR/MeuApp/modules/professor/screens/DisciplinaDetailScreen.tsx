import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import { ManagementCard } from '../components/ManagementCard';
import styles from '../styles/MyDisciplinasStyles';

const MANAGEMENT_ITEMS = [
  { title: 'Frequência', icon: 'calendar-check-outline', screen: 'FrequenciaChamada', color: '#2563eb' },
  { title: 'Notas', icon: 'star-outline', screen: 'NotasLancamento', color: '#2563eb' },
];

export default function DisciplinaDetailScreen({ route, navigation }: any) {
  const { disciplinaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
              <MaterialCommunityIcons name="arrow-left" size={26} color={headerColor} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: headerColor }]}>{disciplinaNome}</Text>
          </View>
          <Text style={styles.subtitle}>Gerenciamento de Turma</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Card Pedagógico em Destaque */}
          <ManagementCard 
            title="Pedagógico"
            icon="book-open-page-variant" // Ícone levemente diferente para destaque se quiser
            color="#2563eb"
            isLightTheme={isLightTheme}
            onPress={() => navigation.navigate('DisciplinaMateriais', { ...route.params })}
            customStyle={{ 
              marginBottom: 20, 
              padding: 20, 
              borderLeftWidth: 5, 
              borderLeftColor: '#2563eb',
              flexDirection: 'row', // Sobrescreve o padrão do grid
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {MANAGEMENT_ITEMS.map((item, index) => (
              <ManagementCard 
                key={index}
                title={item.title}
                icon={item.icon}
                color={item.color}
                isLightTheme={isLightTheme}
                onPress={() => navigation.navigate(item.screen, { ...route.params })}
                customStyle={{ 
                  width: '48%', 
                  flexDirection: 'column', 
                  height: 120, 
                  justifyContent: 'center' 
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}