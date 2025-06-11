import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useTheme } from "./contexts/ThemeContext"; // Para alternar entre temas
import { MaterialIcons } from "@expo/vector-icons"; // Biblioteca de ícones
import styles from "./styles/CursosStyles";

type Curso = {
  id: number;
  titulo: string;
  tipo: string;
  duracao: string;
  modalidades: string[];
  destaque: string;
  descricao: string;
  imagem: any;
};

const cursos: Curso[] = [
  {
    id: 1,
    titulo: "Designer Gráfico",
    tipo: "Presencial",
    duracao: "12 meses",
    modalidades: ["CorelDraw", "Illustrator", "Photoshop", "InDesign"],
    destaque: "Destaque",
    descricao:
      "O curso de Designer Gráfico capacita você para criar projetos visuais utilizando ferramentas como CorelDraw, Illustrator, Photoshop e InDesign.",
    imagem: require("./assets/designer.jpg"),
  },
  {
    id: 2,
    titulo: "Informática Profissional",
    tipo: "Presencial",
    duracao: "12 meses",
    modalidades: [
      "Sistemas Operacionais",
      "Pacote Office",
      "Noções Básicas de Edição de Vídeo",
      "Montagem e Manutenção",
    ],
    destaque: "Mais procurado",
    descricao:
      "O curso de Informática Profissional prepara você para atuar em diversas áreas da tecnologia, incluindo sistemas operacionais, pacote Office, edição de vídeo e manutenção de computadores.",
    imagem: require("./assets/informatica.jpg"),
  },
];

export default function Cursos() {
  const { theme } = useTheme(); // Obtém o tema atual
  const isDarkTheme = theme === "dark";

  const [modalVisible, setModalVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  const abrirModal = (curso: Curso) => {
    setCursoSelecionado(curso);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCursoSelecionado(null);
  };

  const renderCurso = ({ item }: { item: Curso }) => (
    <View style={[styles.card, isDarkTheme && styles.cardDark]}>
      <Image source={item.imagem} style={styles.imagem} />

      <View style={styles.destaqueBadge}>
        <Text style={styles.destaqueTexto}>{item.destaque}</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.subtitulo}>{`${item.tipo} | ${item.duracao}`}</Text>

        <View style={styles.tagsContainer}>
          {item.modalidades.map((modalidade, index) => (
            <Text key={index} style={styles.tag}>
              {modalidade}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.botaoInscreva}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Inscreva-se</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => abrirModal(item)}>
          <Text style={styles.link}>Sobre o Curso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkTheme && styles.containerDark]}>
      <FlatList
        data={cursos}
        renderItem={renderCurso}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Exibe dois cards por linha
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Modal para exibir a descrição do curso */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>{cursoSelecionado?.titulo}</Text>
            <Text style={styles.modalDescricao}>
              {cursoSelecionado?.descricao}
            </Text>
            <Text style={styles.sectionTitle}>Módulos:</Text>
            {cursoSelecionado?.modalidades.map((modulo, index) => (
              <View key={index} style={styles.modalModuloContainer}>
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color="#2563eb"
                  style={styles.modalIcon}
                />
                <Text style={styles.modalModulo}>{modulo}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.modalBotao} onPress={fecharModal}>
              <Text style={styles.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}