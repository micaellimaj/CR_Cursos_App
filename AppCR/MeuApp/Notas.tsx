import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
    { id: '1', materia: 'Matemática', quantidade: 2 },
    { id: '2', materia: 'Português', quantidade: 0 },
    { id: '3', materia: 'História', quantidade: 1 },
];

const Notas: React.FC = () => {
    const [notas] = useState<Nota[]>(notasExemplo);
    const [faltas] = useState<Falta[]>(faltasExemplo);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Minhas Notas</Text>
            <FlatList
                data={notas}
                keyExtractor={(item: Nota) => item.id}
                renderItem={({ item }: { item: Nota }) => (
                    <View style={styles.nota}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.titulo}>{item.titulo}</Text>
                            <Text>{item.conteudo}</Text>
                        </View>
                    </View>
                )}
                style={styles.lista}
            />

            <Text style={[styles.header, { marginTop: 30 }]}>Faltas por Matéria</Text>
            <FlatList
                data={faltas}
                keyExtractor={(item: Falta) => item.id}
                renderItem={({ item }: { item: Falta }) => (
                    <View style={styles.falta}>
                        <Text style={styles.materia}>{item.materia}:</Text>
                        <Text style={styles.quantidade}>{item.quantidade}</Text>
                    </View>
                )}
                style={styles.lista}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    lista: { marginTop: 20 },
    nota: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 5, marginBottom: 10 },
    titulo: { fontWeight: 'bold', fontSize: 16 },
    falta: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e3f2fd', padding: 10, borderRadius: 5, marginBottom: 10 },
    materia: { fontWeight: 'bold', fontSize: 16, flex: 1 },
    quantidade: { fontSize: 16, color: '#1976d2' },
});

export default Notas;
