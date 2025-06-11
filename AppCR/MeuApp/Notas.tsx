import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';

const MODULOS = [
  'Sistemas Operacionais',
  'Word',
  'Excel',
  'PowerPoint',
  'Edição de Vídeo',
  'Montagem e Manutenção de Computadores',
];

const NOTAS = ['AT 1', 'AT 2', 'AT 3', 'Prova'];

const Notas: React.FC = () => {
  const { theme } = useTheme();
  const globalStyles = getGlobalStyles(theme);

  // Cor dos cards igual à AulasScreen
  const cardBg = '#1e3a8a';
  const cardText = theme === 'dark' ? '#fff' : '#1e293b';
  const bgColor = theme === 'dark' ? undefined : '#fff'; // Fundo branco no light, sem cor no dark

  // Exemplo de estrutura para integração com backend (Firebase)
  // const dadosNotas = [
  //   {
  //     modulo: 'Sistemas Operacionais',
  //     notas: { 'AT 1': valor, 'AT 2': valor, 'AT 3': valor, 'Prova': valor },
  //     notaFinal: valor,
  //   },
  //   ...
  // ];

  return (
    <View style={[globalStyles.container, bgColor ? { backgroundColor: bgColor } : {}]}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.headerTitle, { color: cardText }]}>Suas Notas</Text>
        {MODULOS.map((modulo, idx) => (
          <View key={modulo} style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: '#fff', marginBottom: 10 }]}>{modulo}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {NOTAS.map((notaNome) => (
                <View key={notaNome} style={styles.notaBox}>
                  <Text style={[styles.notaLabel, { color: '#cbd5e1' }]}>{notaNome}</Text>
                  {/* Valor da nota virá do backend */}
                  <Text style={[styles.notaValor, { color: '#fff' }]}>-</Text>
                </View>
              ))}
            </View>
            {/* Nota final do módulo */}
            <View style={styles.notaFinalBox}>
              <Text style={[styles.notaFinalLabel, { color: '#cbd5e1' }]}>Nota Final</Text>
              {/* Valor da nota final virá do backend */}
              <Text style={[styles.notaFinalValor, { color: '#fff' }]}>-</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notaBox: {
    width: '23%',
    marginBottom: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    paddingVertical: 8,
  },
  notaLabel: {
    fontSize: 13,
    marginBottom: 2,
  },
  notaValor: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notaFinalBox: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingVertical: 8,
  },
  notaFinalLabel: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  notaFinalValor: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Notas;