import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from './contexts/ThemeContext'; // Para alternar entre temas
import styles from './styles/TelaConteudosStyles'; // Importando os estilos

type Tema = {
  id: number;
  titulo: string;
  nome: string;
  status: string;
  arquivo: DocumentPicker.DocumentPickerResult | null; // Permite null ou um objeto do tipo DocumentPickerResult
};

export default function TelaConteudos() {
  const { theme } = useTheme(); // Obtém o tema atual
  const isDarkTheme = theme === 'dark';

  // Estado para armazenar os temas e arquivos
  const [temas, setTemas] = useState<Tema[]>([
    { id: 1, titulo: "Tema 1", nome: "Sistemas Operacionais", status: "Não Estudado", arquivo: null },
    { id: 2, titulo: "Tema 2", nome: "Pacote Office: Word", status: "Não Estudado", arquivo: null },
    { id: 3, titulo: "Tema 3", nome: "Pacote Office: Excel", status: "Não Estudado", arquivo: null },
    { id: 4, titulo: "Tema 4", nome: "Pacote Office: PowerPoint", status: "Não Estudado", arquivo: null },
    { id: 5, titulo: "Tema 5", nome: "Edição de Video", status: "Não Estudado", arquivo: null },
    { id: 6, titulo: "Tema 6", nome: "Montagem & Manutenção", status: "Não Estudado", arquivo: null },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null); // ID do tema em edição
  const [newTitle, setNewTitle] = useState<string>(""); // Novo título temporário

  const handleUpload = async (id: number) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Apenas arquivos PDF
      multiple: false,
    });

    // Verifica se o resultado é do tipo DocumentPickerSuccessResult
    if (result && 'uri' in result) {
      const file = result; // O arquivo selecionado
      console.log(`Arquivo selecionado para o Tema ${id}:`, file);

      // Atualiza o estado com o arquivo selecionado
      setTemas((prevTemas) =>
        prevTemas.map((tema) =>
          tema.id === id ? { ...tema, arquivo: file } : tema
        )
      );

      // Aqui você pode enviar o arquivo para o Firebase Storage
      Alert.alert("Sucesso", `Arquivo enviado para o Tema ${id}`);
    } else {
      // Caso o usuário cancele a seleção
      console.log("Seleção de arquivo cancelada.");
    }
  };

  const handleDownload = (arquivo: any, id: number) => {
    if (!arquivo) {
      Alert.alert("Erro", "Nenhum arquivo disponível para download.");
      return;
    }

    // Aqui você pode implementar a lógica de download do arquivo usando Firebase Storage
    console.log("Baixando arquivo:", arquivo);
    Alert.alert("Download", "O arquivo está sendo baixado...");

    // Marca como 'Estudado' ao baixar
    setTemas((prevTemas) =>
      prevTemas.map((tema) =>
        tema.id === id ? { ...tema, status: "Estudado" } : tema
      )
    );
  };

  const toggleStatus = (id: number) => {
    setTemas((prevTemas) =>
      prevTemas.map((tema) =>
        tema.id === id
          ? { ...tema, status: tema.status === "Estudado" ? "Não Estudado" : "Estudado" }
          : tema
      )
    );
  };

  return (
    <ScrollView
      style={[
        styles.container,
        isDarkTheme && styles.containerDark,
      ]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false} // <-- Adicionado aqui
    >
      <View style={styles.headerSection}>
        <Text
          style={[
            styles.title,
            isDarkTheme && styles.titleDark,
          ]}
        >
          Informática Profissional
        </Text>
        <ProgressBar
          progress={0.21}
          color={isDarkTheme ? "#63b3ed" : "#2563eb"}
          style={styles.progressBar}
        />
      </View>

      {temas.map((tema) => (
        <View
          key={tema.id}
          style={[
            styles.card,
            isDarkTheme && styles.cardDark,
          ]}
        >
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                isDarkTheme && styles.cardTitleDark,
              ]}
            >
              {tema.nome}
            </Text>
            <TouchableOpacity onPress={() => handleUpload(tema.id)}>
              <MaterialIcons name="file-upload" size={24} color={isDarkTheme ? "#63b3ed" : "#2563eb"} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.cardSubtitle,
              isDarkTheme && styles.cardSubtitleDark,
            ]}
          >
            {tema.titulo}
          </Text>
          <View style={styles.cardFooter}>
            <TouchableOpacity
              style={[
                styles.cardStatus,
                tema.status === "Estudado"
                  ? isDarkTheme
                    ? styles.cardStatusEstudadoDark
                    : styles.cardStatusEstudado
                  : isDarkTheme
                  ? styles.cardStatusNaoEstudadoDark
                  : styles.cardStatusNaoEstudado,
              ]}
              onPress={() => toggleStatus(tema.id)} // Alterna o status
            >
              <Text style={styles.cardStatusText}>
                {tema.status}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDownload(tema.arquivo, tema.id)}>
              <Ionicons name="download" size={24} color={isDarkTheme ? "#63b3ed" : "#2563eb"} />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Área de upload para professores */}
      <View
        style={[
          styles.uploadSection,
          isDarkTheme && styles.uploadSectionDark,
        ]}
      >
        <Text
          style={[
            styles.uploadTitle,
            isDarkTheme && styles.uploadTitleDark,
          ]}
        >
          Área do Professor
        </Text>
        <Text style={styles.uploadInstruction}>
          Clique no ícone de upload em um tema para enviar um arquivo PDF.
        </Text>
      </View>
    </ScrollView>
  );
}
