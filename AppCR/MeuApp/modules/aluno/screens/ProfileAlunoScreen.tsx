import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../contexts/AuthContext';
import styles from '../../../styles/ProfileStyles';
import { getAlunoById, updateAluno } from '../controllers/alunoController';
import { IAluno, IUpdateAlunoPayload } from '../types';

export default function ProfileAlunoScreen() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const { width } = useWindowDimensions();

  const colors = {
    cardBg: isLightTheme ? '#fff' : '#23272f',
    divider: isLightTheme ? '#e1e1e1' : '#334155',
    mainText: isLightTheme ? '#2563eb' : '#fff',
    subText: isLightTheme ? '#555' : '#cbd5e1',
    label: isLightTheme ? '#2563eb' : '#60a5fa',
    iconColor: isLightTheme ? '#2563eb' : '#60a5fa',
    bgScreen: isLightTheme ? '#f5f7fa' : '#181a20',
    buttonText: '#ffffff',
    updateButtonBg: isLightTheme ? '#2563eb' : '#60a5fa',
  };

  const cardWidth = width > 440 ? 400 : width * 0.92;
  const avatarSize = width > 400 ? 60 : width * 0.14;

  const [aluno, setAluno] = useState<IAluno | null>(null);
  const [passwordInput, setPasswordInput] = useState('********');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    }
    return cleaned.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d{4})$/, '$1-$2').slice(0, 15);
  };

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAlunoById(user!.id);
      setAluno(data);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!user?.id || !aluno) return;

    try {
      setUpdating(true);
      const updatePayload: IUpdateAlunoPayload = {
        full_name: aluno.full_name,
        telefone: aluno.telefone || "",
        data_nascimento: aluno.data_nascimento,
        nome_responsavel: aluno.nome_responsavel || "",
        telefone_responsavel: aluno.telefone_responsavel || "",
      };

      if (passwordInput !== '********' && passwordInput.length >= 6) {
        updatePayload.senha = passwordInput;
      }

      await updateAluno(user.id, updatePayload);
      Alert.alert('Sucesso', 'Dados atualizados!');
      setPasswordInput('********');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bgScreen }}>
        <ActivityIndicator size="large" color={colors.mainText} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgScreen }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 32 }}>
        <View style={[styles.card, { backgroundColor: colors.cardBg, width: cardWidth, marginTop: 32, padding: 20, borderRadius: 10 }]}>
          
          <View style={[styles.header, { marginBottom: 15, flexDirection: 'row', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.mainText }]}>{aluno?.full_name || 'Aluno'}</Text>
              <Text style={[styles.course, { color: colors.subText }]}>Estudante • {aluno?.idade} anos</Text>
            </View>
            
            <View style={{ 
              width: avatarSize, 
              height: avatarSize, 
              borderRadius: avatarSize / 2, 
              backgroundColor: isLightTheme ? '#f1f5f9' : '#334155',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: colors.mainText
            }}>
              <MaterialCommunityIcons name="account-outline" size={avatarSize * 0.7} color={colors.mainText} />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.label, { color: colors.label }]}>Data de Nascimento</Text>
            <Text style={[styles.value, { color: colors.mainText }]}>{aluno?.data_nascimento || 'N/A'}</Text>
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.mainText, marginVertical: 10 }}>Meus dados</Text>

          {/* Email - Somente Leitura */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Email</Text>
              <Text style={{ color: colors.mainText, fontSize: 16 }}>{aluno?.email}</Text>
            </View>
            <Feather name="mail" size={20} color={colors.iconColor} />
          </View>

          {/* Telefone */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Telefone</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={aluno?.telefone || ''}
                onChangeText={(t) => aluno && setAluno({ ...aluno, telefone: formatPhone(t) })}
                keyboardType="phone-pad"
              />
            </View>
            <Feather name="edit" size={20} color={colors.iconColor} />
          </View>

          {/* Nova Senha */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Nova Senha</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                secureTextEntry
                value={passwordInput}
                onChangeText={setPasswordInput}
                placeholder="Digite para alterar"
                placeholderTextColor={colors.subText}
              />
            </View>
            <Feather name="lock" size={20} color={colors.iconColor} />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.mainText, marginVertical: 10, marginTop: 20 }}>Responsável</Text>

          {/* Nome do Responsável */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Nome do Responsável</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={aluno?.nome_responsavel || ''}
                onChangeText={(t) => aluno && setAluno({ ...aluno, nome_responsavel: t })}
              />
            </View>
            <Feather name="user" size={20} color={colors.iconColor} />
          </View>

          {/* Telefone do Responsável */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Telefone do Responsável</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={aluno?.telefone_responsavel || ''}
                onChangeText={(t) => aluno && setAluno({ ...aluno, telefone_responsavel: formatPhone(t) })}
                keyboardType="phone-pad"
              />
            </View>
            <Feather name="phone" size={20} color={colors.iconColor} />
          </View>

          <TouchableOpacity
            style={[
                styles.updateButton, 
                { 
                backgroundColor: colors.updateButtonBg,
                marginTop: 30, 
                opacity: updating ? 0.7 : 1,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                }
            ]}
            onPress={handleUpdate}
            disabled={updating}
            >
            {updating ? (
                <ActivityIndicator color="#ffffff" />
            ) : (
                <Text style={[styles.updateButtonText, { color: '#ffffff' }]}> 
                Atualizar Perfil 
                </Text>
            )}
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}