import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import { useTheme } from '../../../contexts/ThemeContext';
import styles from '../../../styles/ProfileStyles';
import { getAdminProfile, updateAdminProfile } from '../controllers/profileController';
import { IAdmin } from '../types';

export default function ProfileAdminScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
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
  const avatarSize = 80;

  const [admin, setAdmin] = useState<IAdmin>({
    full_name: '',
    email: '',
  });

  const [passwordInput, setPasswordInput] = useState('********');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getAdminProfile();
      setAdmin({
        full_name: data.full_name,
        email: data.email,
      });
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatePayload: Partial<IAdmin> = {
        full_name: admin.full_name,
        email: admin.email,
      };

      if (passwordInput !== '********') {
        if (passwordInput.length < 6) return Alert.alert('Erro', 'Senha muito curta.');
        updatePayload.senha = passwordInput;
      }

      const response = await updateAdminProfile(updatePayload);
      Alert.alert('Sucesso', response.message);
      setPasswordInput('********');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
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
        
        {/* BOTÃO VOLTAR */}
        <View style={{ width: cardWidth, marginTop: 20, alignItems: 'flex-start' }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('AdminHome')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.mainText} />
            <Text style={{ color: colors.mainText, fontSize: 16, marginLeft: 8, fontWeight: '600' }}>
              Voltar para o Início
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg, width: cardWidth, marginTop: 20, padding: 20 }]}>
          
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.mainText }]}>{admin.full_name || 'Admin'}</Text>
              <Text style={[styles.course, { color: colors.subText }]}>Painel Administrativo</Text>
            </View>
            <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2, borderColor: colors.mainText }]}>
              <Image source={require('../../../assets/aluno.png')} style={styles.avatar} />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.divider }]} />

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: colors.mainText, marginVertical: 15 }}>Configurações da Conta</Text>

          {/* Nome */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Nome</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={admin.full_name}
                onChangeText={(t) => setAdmin({ ...admin, full_name: t })}
              />
            </View>
            <Feather name="edit-2" size={18} color={colors.iconColor} style={styles.iconButton} />
          </View>

          {/* Email */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>E-mail</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                value={admin.email}
                onChangeText={(t) => setAdmin({ ...admin, email: t })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <Feather name="mail" size={18} color={colors.iconColor} style={styles.iconButton} />
          </View>

          {/* Senha */}
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.subText, fontSize: 12 }}>Nova Senha</Text>
              <TextInput
                style={{ color: colors.mainText, fontSize: 16, borderBottomWidth: 1, borderColor: colors.divider }}
                secureTextEntry
                value={passwordInput}
                onChangeText={setPasswordInput}
              />
            </View>
            <Feather name="lock" size={18} color={colors.iconColor} style={styles.iconButton} />
          </View>

          <TouchableOpacity
            style={[styles.updateButton, { backgroundColor: colors.mainText, marginTop: 25 }]}
            onPress={handleUpdate}
          >
            <Text style={styles.updateButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}