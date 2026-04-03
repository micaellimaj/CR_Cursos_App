import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity, Linking 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { getGlobalStyles } from '../../../styles/globalStyles';
import styles from '../styles/MyTurmasStyles';

import { getAlunosDaTurma } from '../controllers/turmaController';
import { IAlunoTurma } from '../types';

export default function TurmaDetailScreen({ route, navigation }: any) {
  const { turmaId, turmaNome } = route.params;
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);
  const isLightTheme = theme === 'light';

  const [alunos, setAlunos] = useState<IAlunoTurma[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const data = await getAlunosDaTurma(turmaId);
      setAlunos(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao carregar alunos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, [turmaId]);

  const handleCall = (phone?: string) => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert("Aviso", "Telefone não cadastrado.");
    }
  };

  const handleEmail = (email?: string) => {
  if (email) {
    Linking.openURL(`mailto:${email}`);
  } else {
    Alert.alert("Aviso", "E-mail não cadastrado.");
  }
};

  const renderAlunoCard = (item: IAlunoTurma) => (
  <View 
    style={[
      styles.subjectCard, 
      { 
        backgroundColor: isLightTheme ? '#fff' : '#1e293b',
        elevation: 0, 
        shadowOpacity: 0, 
        borderWidth: 1, 
        borderColor: isLightTheme ? '#e2e8f0' : '#334155',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12
      }
    ]}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Avatar Placeholder */}
      <View style={{ 
        width: 45, 
        height: 45, 
        borderRadius: 22.5, 
        backgroundColor: 'rgba(37, 99, 235, 0.1)', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <MaterialCommunityIcons name="account" size={24} color="#2563eb" />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text numberOfLines={1} style={{ 
          color: isLightTheme ? '#1e293b' : '#fff', 
          fontSize: 15, 
          fontWeight: 'bold' 
        }}>
          {item.full_name}
        </Text>
        
        {/* Clique no e-mail para abrir o app de mensagens */}
        <TouchableOpacity onPress={() => handleEmail(item.email)}>
          <Text numberOfLines={1} style={{ color: '#2563eb', fontSize: 12, textDecorationLine: 'underline' }}>
            {item.email}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        {item.telefone && (
          <TouchableOpacity 
            onPress={() => handleCall(item.telefone)}
            style={{ 
              width: 38, 
              height: 38, 
              borderRadius: 10, 
              backgroundColor: isLightTheme ? '#f1f5f9' : '#334155', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
          >
            <MaterialCommunityIcons name="phone-outline" size={18} color="#2563eb" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('DisciplinaDetail', {
              alunoId: item.id,
              alunoNome: item.full_name,
              turmaId: turmaId,
              turmaNome: turmaNome
            })}
          style={{ 
            width: 38, 
            height: 38, 
            borderRadius: 10, 
            backgroundColor: '#2563eb', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <MaterialCommunityIcons name="clipboard-text-clock-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: isLightTheme ? '#f8fafc' : '#0f172a' }]}>
      <View style={styles.content}>
        
        <View style={styles.headerSection}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
              <MaterialCommunityIcons name="arrow-left" size={26} color={isLightTheme ? '#1e3a8a' : '#fff'} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: isLightTheme ? '#1e3a8a' : '#fff', flex: 1 }]}>
              {turmaNome}
            </Text>
          </View>
          <Text style={styles.subtitle}>{alunos.length} Alunos matriculados</Text>
        </View>

        {loading ? (
          <ActivityIndicator color="#2563eb" size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={alunos}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => renderAlunoCard(item)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="account-search-outline" size={48} color="#64748b" />
                <Text style={styles.emptyText}>Nenhum aluno encontrado.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}