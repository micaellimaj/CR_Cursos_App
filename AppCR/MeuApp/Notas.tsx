import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Biblioteca de ícones
import { useTheme } from "./contexts/ThemeContext"; // Suporte para temas
import styles from "./styles/NotasStyles"; // Importa os estilos

interface Nota {
  id: string;
  titulo: string;
  conteudo: string;
  nota: number;
}

interface Falta {
  id: string;
  materia: string;
  quantidade: number;
}

const notasExemplo: Nota[] = [
  { id: "1", titulo: "Nota 1", conteudo: "Conteúdo do módulo 1", nota: 8.5 },
  { id: "2", titulo: "Nota 2", conteudo: "Conteúdo do módulo 2", nota: 7.0 },
  { id: "3", titulo: "Nota 3", conteudo: "Conteúdo do módulo 3", nota: 9.2 },
  { id: "4", titulo: "Nota 4", conteudo: "Conteúdo do módulo 4", nota: 6.8 },
  { id: "5", titulo: "Nota 5", conteudo: "Conteúdo do módulo 5", nota: 8.0 },
];

const faltasExemplo: Falta[] = [
  { id: "1", materia: "Módulo 1", quantidade: 2 },
  { id: "2", materia: "Módulo 2", quantidade: 0 },
  { id: "3", materia: "Módulo 3", quantidade: 1 },
  { id: "4", materia: "Módulo 4", quantidade: 3 },
  { id: "5", materia: "Módulo 5", quantidade: 0 },
];

const Notas: React.FC = () => {
  const { theme } = useTheme(); // Obtém o tema atual
  const isDarkTheme = theme === "dark";

  const [notas] = useState<Nota[]>(notasExemplo);
  const [faltas] = useState<Falta[]>(faltasExemplo);

  return (
    <View
      style={[
        styles.container,
        isDarkTheme ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={[
          styles.header,
          isDarkTheme ? styles.headerDark : styles.headerLight,
        ]}
      >
        Minhas Notas
      </Text>
      <FlatList
        data={notas}
        keyExtractor={(item: Nota) => item.id}
        renderItem={({ item }: { item: Nota }) => (
          <View
            style={[
              styles.nota,
              isDarkTheme ? styles.notaDark : styles.notaLight,
            ]}
          >
            <MaterialIcons
              name="assignment"
              size={24}
              color={isDarkTheme ? "#63b3ed" : "#2563eb"}
              style={styles.icon}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.titulo,
                  isDarkTheme ? styles.tituloDark : styles.tituloLight,
                ]}
              >
                {item.titulo} - {item.nota.toFixed(1)}
              </Text>
              <Text
                style={[
                  styles.conteudo,
                  isDarkTheme ? styles.conteudoDark : styles.conteudoLight,
                ]}
              >
                {item.conteudo}
              </Text>
            </View>
          </View>
        )}
        style={styles.lista}
      />

      <Text
        style={[
          styles.header,
          { marginTop: 30 },
          isDarkTheme ? styles.headerDark : styles.headerLight,
        ]}
      >
        Faltas por Matéria
      </Text>
      <FlatList
        data={faltas}
        keyExtractor={(item: Falta) => item.id}
        renderItem={({ item }: { item: Falta }) => (
          <View
            style={[
              styles.falta,
              isDarkTheme ? styles.faltaDark : styles.faltaLight,
            ]}
          >
            <MaterialIcons
              name="error"
              size={24}
              color={isDarkTheme ? "#f87171" : "#dc2626"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.materia,
                isDarkTheme ? styles.materiaDark : styles.materiaLight,
              ]}
            >
              {item.materia}:
            </Text>
            <Text
              style={[
                styles.quantidade,
                isDarkTheme ? styles.quantidadeDark : styles.quantidadeLight,
              ]}
            >
              {item.quantidade}
            </Text>
          </View>
        )}
        style={styles.lista}
      />
    </View>
  );
};

export default Notas;
