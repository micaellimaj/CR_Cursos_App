import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "./contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
  {
    id: 3,
    titulo: "Música",
    tipo: "Presencial",
    duracao: "3h por Aula",
    modalidades: ["Aulas Teóricas", "Aulas Práticas"],
    destaque: "Novo",
    descricao:
      "O curso de Música oferece aulas teóricas e práticas para desenvolver suas habilidades musicais, seja para iniciantes ou avançados.",
    imagem: require("./assets/musica.jpeg"),
  },
  {
    id: 4,
    titulo: "Auxiliar de Farmácia",
    tipo: "Presencial",
    duracao: "10 meses",
    modalidades: [
      "Atendimento ao Cliente",
      "Anatomia",
      "Primeiros Socorros",
      "Farmacologia",
      "Segurança do Trabalho",
      "Bônus: Estágio",
    ],
    destaque: "Bônus: Estágio",
    descricao:
      "O curso de Auxiliar de Farmácia prepara o aluno para atuar em farmácias e drogarias, com módulos de atendimento ao cliente, anatomia, primeiros socorros, farmacologia e segurança do trabalho. Inclui bônus de estágio supervisionado.",
    imagem: require("./assets/farmacia.jpeg"),
  },
  {
    id: 5,
    titulo: "Maquiagem Profissional",
    tipo: "Presencial",
    duracao: "2 dias | 16 horas",
    modalidades: [
      "Maquiagem Social",
      "Camuflagem",
      "Pele Madura",
      "4 Técnicas de Olho e Pele",
      "Formandas/Debutantes",
    ],
    destaque: "Tendência",
    descricao:
      "O curso de Maquiagem Profissional aborda desde maquiagem social até técnicas avançadas para pele madura, camuflagem, olhos e pele, além de preparação para formandas e debutantes.",
    imagem: require("./assets/beleza.jpeg"),
  },
  {
    id: 6,
    titulo: "Reforço Escolar",
    tipo: "Presencial",
    duracao: "4 aulas por semana",
    modalidades: [
      "Leitura",
      "Atividades Escolares",
      "Escrita",
      "Comportamento",
      "Atividades Extras",
      "Bônus: LIBRAS",
    ],
    destaque: "Bônus: LIBRAS",
    descricao:
      "O curso de Reforço Escolar oferece apoio em leitura, escrita, atividades escolares, comportamento e atividades extras, com bônus de LIBRAS para inclusão.",
    imagem: require("./assets/reforço.jpg"),
  },
];

export default function Cursos() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [modalVisible, setModalVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  // Estado para novo curso
  const [modalNovoCurso, setModalNovoCurso] = useState(false);
  const [novoCurso, setNovoCurso] = useState({
    titulo: "",
    tipo: "",
    duracao: "",
    modalidades: "",
    destaque: "",
    descricao: "",
    imagem: null as any,
  });
  const [uploading, setUploading] = useState(false);
  const [cursosExtra, setCursosExtra] = useState<Curso[]>([]);

  const abrirModal = (curso: Curso) => {
    setCursoSelecionado(curso);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCursoSelecionado(null);
  };

  // Selecionar imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setNovoCurso((prev) => ({
        ...prev,
        imagem: result.assets[0],
      }));
    }
  };

  // Salvar novo curso (local, para Firebase adapte a lógica)
  const handleCriarCurso = async () => {
    setUploading(true);
    // Aqui você pode fazer upload da imagem para o Firebase e obter a URL
    // Exemplo local:
    setCursosExtra((prev) => [
      ...prev,
      {
        id: Date.now(),
        titulo: novoCurso.titulo,
        tipo: novoCurso.tipo,
        duracao: novoCurso.duracao,
        modalidades: novoCurso.modalidades.split(",").map((m) => m.trim()),
        destaque: novoCurso.destaque,
        descricao: novoCurso.descricao,
        imagem: novoCurso.imagem ? { uri: novoCurso.imagem.uri } : require("./assets/designer.jpg"),
      },
    ]);
    setNovoCurso({
      titulo: "",
      tipo: "",
      duracao: "",
      modalidades: "",
      destaque: "",
      descricao: "",
      imagem: null,
    });
    setUploading(false);
    setModalNovoCurso(false);
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
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <FlatList
          data={[...cursos, ...cursosExtra]}
          renderItem={renderCurso}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            paddingBottom: 20,
          }}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Botão flutuante "+" */}
      <TouchableOpacity
        style={localStyles.fab}
        onPress={() => setModalNovoCurso(true)}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal para criar novo curso */}
      <Modal
        visible={modalNovoCurso}
        transparent
        animationType="slide"
        onRequestClose={() => setModalNovoCurso(false)}
      >
        <KeyboardAvoidingView
          style={localStyles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={localStyles.modalContent}>
            <Text style={styles.modalTitulo}>Novo Curso</Text>
            <TextInput
              placeholder="Título"
              style={localStyles.input}
              value={novoCurso.titulo}
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, titulo: t }))}
            />
            <TextInput
              placeholder="Tipo (ex: Presencial)"
              style={localStyles.input}
              value={novoCurso.tipo}
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, tipo: t }))}
            />
            <TextInput
              placeholder="Duração"
              style={localStyles.input}
              value={novoCurso.duracao}
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, duracao: t }))}
            />
            <TextInput
              placeholder="Módulos (separe por vírgula)"
              style={localStyles.input}
              value={novoCurso.modalidades}
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, modalidades: t }))}
            />
            <TextInput
              placeholder="Destaque"
              style={localStyles.input}
              value={novoCurso.destaque}
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, destaque: t }))}
            />
            <TextInput
              placeholder="Descrição"
              style={[localStyles.input, { height: 60 }]}
              value={novoCurso.descricao}
              multiline
              onChangeText={(t) => setNovoCurso((p) => ({ ...p, descricao: t }))}
            />
            <TouchableOpacity style={localStyles.uploadBtn} onPress={pickImage}>
              <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                {novoCurso.imagem ? "Imagem Selecionada" : "Selecionar Imagem"}
              </Text>
            </TouchableOpacity>
            {uploading && <ActivityIndicator color="#2563eb" />}
            <View style={{ flexDirection: "row", marginTop: 16 }}>
              <TouchableOpacity
                style={[styles.modalBotao, { marginRight: 8 }]}
                onPress={handleCriarCurso}
                disabled={uploading}
              >
                <Text style={styles.modalBotaoTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBotao, { backgroundColor: "#aaa" }]}
                onPress={() => setModalNovoCurso(false)}
                disabled={uploading}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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

// Estilo local para o botão flutuante e modal
const localStyles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#2563eb",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "stretch",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: "#f9f9f9",
  },
  uploadBtn: {
    backgroundColor: "#e0e7ef",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 8,
  },
});