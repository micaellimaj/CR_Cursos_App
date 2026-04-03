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

  const renderAlunoCard = (item: IAlunoTurma) => (
    <View 
      style={[
        styles.subjectCard, 
        { backgroundColor: isLightTheme ? '#fff' : '#1e293b' }
      ]}
    >
      <View style={styles.cardMainContent}>
        {/* Ícone em Azul */}
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
          <MaterialCommunityIcons name="account" size={24} color="#2563eb" />
        </View>

        <View style={styles.subjectInfo}>
          <Text numberOfLines={1} style={[styles.subjectName, { color: isLightTheme ? '#1e293b' : '#fff' }]}>
            {item.full_name}
          </Text>
          <Text numberOfLines={1} style={styles.courseTag}>{item.email}</Text>
          
          {item.telefone && (
            <View style={styles.tagRow}>
              <TouchableOpacity 
                onPress={() => handleCall(item.telefone)}
                style={[styles.infoTag, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}
              >
                <MaterialCommunityIcons name="phone-outline" size={12} color="#2563eb" />
                <Text style={[styles.tagText, { color: '#2563eb' }]}>{item.telefone}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.actionColumn}>
          {/* Botão de Ação Único: Notas e Frequência */}
          <TouchableOpacity
            onPress={() => navigation.navigate('DisciplinaDetail', {
                alunoId: item.id,
                alunoNome: item.full_name,
                turmaId: turmaId,
                turmaNome: turmaNome
              })}
            style={styles.miniBadgeButton}
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