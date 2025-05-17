import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const conteudos = [
    { id: 1, titulo: 'Introdução ao Curso', descricao: 'Conheça o objetivo e estrutura do curso.' },
    { id: 2, titulo: 'Módulo 1: Fundamentos', descricao: 'Aprenda os conceitos básicos necessários.' },
    { id: 3, titulo: 'Módulo 2: Prática', descricao: 'Exercícios e exemplos práticos.' },
    { id: 4, titulo: 'Avaliação', descricao: 'Teste seus conhecimentos.' },
];

export default function Conteudoext() {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Conteúdos do Curso</Text>
            <ScrollView>
                {conteudos.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.cardTitulo}>{item.titulo}</Text>
                        <Text style={styles.cardDescricao}>{item.descricao}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#f2f2f2',
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