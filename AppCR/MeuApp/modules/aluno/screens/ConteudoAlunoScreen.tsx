import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, 
  Alert, TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../styles/ConteudoAlunoStyles';
import { ConteudoAlunoCard } from '../components/ConteudoAlunoCard';
import { getConteudosByDisciplina } from '../controllers/conteudoController';
import { IConteudo } from '../types';

export default function ConteudoAlunoScreen({ route, navigation }: any) {
  const { disciplinaId, disciplinaNome } = route.params;
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const [conteudos, setConteudos] = useState<IConteudo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConteudos = async () => {
    try {
      const data = await getConteudosByDisciplina(disciplinaId);
      setConteudos(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConteudos(); }, [disciplinaId]);

  const handleOpenConteudo = (item: IConteudo) => {
    Alert.alert(item.titulo, `Abrindo conteúdo do tipo ${item.tipo}...`);
  };

  const headerColor = isLightTheme ? '#1e3a8a' : '#fff';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }}>
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={headerColor} />
            <Text style={{ marginLeft: 5, color: headerColor, fontWeight: '600' }}>Voltar</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: headerColor }]}>Materiais de Estudo</Text>
          <Text style={styles.subtitle}>{disciplinaNome}</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={conteudos}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ConteudoAlunoCard 
                item={item} 
                isLightTheme={isLightTheme} 
                onPress={handleOpenConteudo}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="folder-open-outline" size={60} color="#cbd5e1" />
                <Text style={{ color: '#64748b', marginTop: 10 }}>Nenhum material disponível ainda.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}