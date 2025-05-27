import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';

interface Nota {
    id: string;
    titulo: string;
    conteudo: string;
}

interface Falta {
    id: string;
    materia: string;
    quantidade: number;
}

const notasExemplo: Nota[] = [
    { id: '1', titulo: 'Nota 1', conteudo: 'Conteúdo da nota 1' },
    { id: '2', titulo: 'Nota 2', conteudo: 'Conteúdo da nota 2' },
];

const faltasExemplo: Falta[] = [
    { id: '1', materia: 'Poo Java', quantidade: 2 },
    { id: '2', materia: 'Desenvolvimento Web', quantidade: 0 },
    { id: '3', materia: 'Pensamento Computacional', quantidade: 1 },
];

const Notas: React.FC = () => {
    const [notas] = useState<Nota[]>(notasExemplo);
    const [faltas] = useState<Falta[]>(faltasExemplo);

    const { theme } = useTheme();
    const globalStyles = getGlobalStyles(theme);

    // Cor dos cards igual à AulasScreen
  const cardBg = '#1e3a8a';
    const cardText = theme === 'dark' ? '#fff' : '#1e293b';
    const bgColor = theme === 'dark' ? undefined : '#fff'; // Fundo branco no light, sem cor no dark

    return (
        <View style={[globalStyles.container, bgColor ? { backgroundColor: bgColor } : {}]}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={[styles.headerTitle, { color: cardText }]}>Minhas Notas</Text>
                <FlatList
                    data={notas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.card, { backgroundColor: cardBg }]}>
                            <Text style={[styles.cardTitle, { color: '#fff' }]}>{item.titulo}</Text>
                            <Text style={[styles.cardContent, { color: '#cbd5e1' }]}>{item.conteudo}</Text>
                        </View>
                    )}
                    style={{ marginBottom: 30 }}
                    scrollEnabled={false}
                />

                <Text style={[styles.headerTitle, { color: cardText, marginTop: 10 }]}>Faltas por Matéria</Text>
                <FlatList
                    data={faltas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.card, { backgroundColor: cardBg, flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={[styles.cardTitle, { color: '#fff' }]}>{item.materia}</Text>
                            <Text style={[styles.cardContent, { color: '#38bdf8', fontWeight: 'bold' }]}>{item.quantidade}</Text>
                        </View>
                    )}
                    scrollEnabled={false}
                />
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
        marginBottom: 15,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardContent: {
        fontSize: 15,
    },
});

export default Notas;