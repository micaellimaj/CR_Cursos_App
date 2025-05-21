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
import styles from "./styles/CursosStyles";

const cursos = [
  {
    id: 1,
    titulo: "Administração",
    tipo: "Bacharelado",
    duracao: "4 anos",
    modalidades: ["Ao vivo", "Digital (EaD)", "Semipresencial", "Presencial"],
    destaque: "Destaque",
    descricao:
      "O curso de Administração prepara você para liderar e gerenciar empresas.",
    imagem: require("./assets/adm.jpg"),
  },
  {
    id: 2,
    titulo: "Análise e Desenvolvimento de Sistemas",
    tipo: "Tecnólogo",
    duracao: "2,5 anos",
    modalidades: ["Ao vivo", "Digital (EaD)", "Semipresencial", "Presencial"],
    destaque: "Destaque",
    descricao:
      "Aprenda a desenvolver sistemas e soluções tecnológicas inovadoras.",
    imagem: require("./assets/ads.jpg"),
  },
  {
    id: 3,
    titulo: "Direito",
    tipo: "Bacharelado",
    duracao: "5 anos",
    modalidades: ["Presencial"],
    destaque: "Destaque",
    descricao: "O curso de Direito forma profissionais para atuar na área jurídica.",
    imagem: require("./assets/direito.jpg"),
  },
  {
    id: 4,
    titulo: "Enfermagem",
    tipo: "Bacharelado",
    duracao: "5 anos",
    modalidades: ["Presencial"],
    destaque: "Mais procurado",
    descricao:
      "O curso de Enfermagem capacita profissionais para cuidar da saúde das pessoas.",
    imagem: require("./assets/enfermagem.jpg"),
  },
];

export default function Cursos() {
  const { theme } = useTheme(); // Obtém o tema atual
  const isDarkTheme = theme === "dark";

  const [modalVisible, setModalVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  const abrirModal = (curso) => {
    setCursoSelecionado(curso);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCursoSelecionado(null);
  };

  const renderCurso = ({ item }) => (
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
            <TouchableOpacity style={styles.modalBotao} onPress={fecharModal}>
              <Text style={styles.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}