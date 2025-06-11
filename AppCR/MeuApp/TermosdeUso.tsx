import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function TermsOfUseScreen() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[stylesTermos.container, { backgroundColor: isLightTheme ? '#f5f7fa' : '#0f172a' }]}>
      <ScrollView contentContainerStyle={stylesTermos.scrollContent}>
        <Text style={[stylesTermos.title, { color: isLightTheme ? '#1e293b' : '#f8fafc' }]}>
          Termos de Uso e Política de Privacidade
        </Text>

        <Text style={[stylesTermos.subtitle, { color: isLightTheme ? '#1e293b' : '#cbd5e1' }]}>
          Última atualização: 11 de junho de 2025
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          1. Aceitação dos Termos
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Ao utilizar o aplicativo CR Cursos Educacional, você concorda com estes Termos de Uso e com a presente Política de Privacidade.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          2. Coleta de Dados Pessoais
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Durante o uso do aplicativo, coletamos informações como nome, data de nascimento, telefone, e-mail e, se necessário, dados do responsável legal (para alunos menores de idade).
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          3. Finalidade do Uso
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Usamos os dados para autenticação, cadastro, comunicação com usuários e conformidade legal.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          4. Compartilhamento
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Não vendemos ou compartilhamos seus dados, exceto quando exigido por lei ou autoridade competente.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          5. Armazenamento e Segurança
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Seus dados são armazenados com segurança e protegidos por mecanismos técnicos, como criptografia de senhas.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          6. Dados de Menores
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Para alunos menores de 18 anos, é obrigatório o consentimento e cadastro do responsável.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          7. Seus Direitos
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Você pode solicitar acesso, alteração ou exclusão dos seus dados pelo e-mail: contato@crcursos.com.br
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          8. Alterações
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0' }]}>
          Esta política pode ser atualizada. Notificações serão feitas pelo aplicativo.
        </Text>

        <Text style={[stylesTermos.section, { color: isLightTheme ? '#2563eb' : '#60a5fa' }]}>
          9. Contato
        </Text>
        <Text style={[stylesTermos.text, { color: isLightTheme ? '#111827' : '#e2e8f0', marginBottom: 24 }]}>
          Em caso de dúvidas, fale conosco: contato@crcursos.com.br
        </Text>

        <TouchableOpacity
          style={[
            stylesTermos.button,
            { backgroundColor: isLightTheme ? '#2563eb' : '#60a5fa' },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={stylesTermos.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const stylesTermos = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'justify',
    lineHeight: 22,
  },
  button: {
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
