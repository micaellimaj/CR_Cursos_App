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
import { getProfessorProfile, updateProfessorProfile } from '../controllers/professorController';
import { IProfessor, IUpdateProfessorPayload } from '../types';

export default function ProfileprofessorScreen() {
  const { user } = useAuth(); // Usando o contexto de autenticação
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
  };

  const cardWidth = width > 440 ? 400 : width * 0.92;
  const avatarSize = width > 400 ? 60 : width * 0.14;

  const [professor, setProfessor] = useState<IProfessor | null>(null);
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
      // O user!.id força o TS a entender que aqui ele não é null
      const data = await getProfessorProfile(user!.id);
      console.log("Dados recebidos do Back:", data); // Debug para ver se os campos batem
      setProfessor(data);
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível carregar o perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!user?.id || !professor) return;

    try {
      setUpdating(true);
      
      // Ajustado conforme o validador do seu Back-end
      const updatePayload: IUpdateProfessorPayload = {
        full_name: professor.full_name,
        telefone: professor.telefone || "",
        data_nascimento: professor.data_nascimento,
      };

      // No seu back o campo é 'senha', não 'password'
      if (passwordInput !== '********' && passwordInput.length >= 6) {
        updatePayload.senha = passwordInput;
      }

      await updateProfessorProfile(user.id, updatePayload);
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
              <Text style={[styles.name, { color: colors.mainText }]}>{professor?.full_name || 'Professor'}</Text>
              <Text style={[styles.course, { color: colors.subText }]}>Corpo Docente • {professor?.idade} anos</Text>
            </View>
            
            {/* Substituído Image por Ícone */}
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
              <MaterialCommunityIcons name="account-tie" size={avatarSize * 0.7} color={colors.mainText} />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <View style={{ marginBottom: 10 }}>
            <Text style={[styles.label, { color: colors.label }]}>Data de Nascimento</Text>
            <Text style={[styles.value, { color: colors.mainText }]}>{professor?.data_nascimento || 'N/A'}</Text>
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.mainText, marginVertical: 10 }}>Meus dados</Text>

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Email</Text>
              <Text style={{ color: colors.mainText, fontSize: 16 }}>{professor?.email}</Text>
            </View>
            <Feather name="mail" size={20} color={colors.iconColor} />
          </View>

          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Telefone</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={professor?.telefone || ''}
                onChangeText={(t) => professor && setProfessor({ ...professor, telefone: formatPhone(t) })}
                keyboardType="phone-pad"
              />
            </View>
            <Feather name="edit" size={20} color={colors.iconColor} />
          </View>

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

          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: colors.mainText, marginTop: 20, opacity: updating ? 0.7 : 1 }]}
            onPress={handleUpdate}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.updateButtonText}>Atualizar Dados</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}