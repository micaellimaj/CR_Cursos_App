import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { getGlobalStyles } from './styles/globalStyles';

const conteudos = [
    { id: 1, titulo: 'Introdução ao Curso', descricao: 'Conheça o objetivo e estrutura do curso.' },
    { id: 2, titulo: 'Módulo 1: Fundamentos', descricao: 'Aprenda os conceitos básicos necessários.' },
    { id: 3, titulo: 'Módulo 2: Prática', descricao: 'Exercícios e exemplos práticos.' },
    { id: 4, titulo: 'Avaliação', descricao: 'Teste seus conhecimentos.' },
];

export default function Conteudoext() {
    const { theme } = useTheme();
    const globalStyles = getGlobalStyles(theme);

    const cardBg = '#1e3a8a';
    const cardText = theme === 'dark' ? '#fff' : '#1e293b';
    const bgColor = theme === 'dark' ? undefined : '#fff';

    return (
        <View style={[globalStyles.container, bgColor ? { backgroundColor: bgColor } : {}]}>
            <Text style={[styles.titulo, { color: cardText }]}>Conteúdos do Curso</Text>
            <ScrollView>
                {conteudos.map(item => (
                    <View key={item.id} style={[styles.card, { backgroundColor: cardBg }]}>
                        <Text style={[styles.cardTitulo, { color: '#fff' }]}>{item.titulo}</Text>
                        <Text style={[styles.cardDescricao, { color: '#cbd5e1' }]}>{item.descricao}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#1e3a8a',
        borderRadius: 8,
        padding: 16,
        marginBottom: 15,
    },
    cardTitulo: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    cardDescricao: {
        fontSize: 15,
        color: '#555',
    },
});