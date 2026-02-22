import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Cor de fundo para o tema claro
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  containerDark: {
    backgroundColor: "#1a202c", // Cor de fundo para o tema escuro
  },
  flatListContainer: {
    paddingBottom: 16, // Espaçamento inferior para o conteúdo do FlatList
    paddingHorizontal: 8, // Espaçamento lateral para os cards
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 8, // um pouco mais de espaço entre os cards
    flexBasis: "48%", // ocupa um pouco mais da linha
    flexGrow: 1,
    minWidth: 150, // aumenta largura mínima
    maxWidth: 200, // aumenta largura máxima
    alignSelf: "stretch",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  cardDark: {
    backgroundColor: "#2d3748",
  },
  imagem: {
    width: "100%",
    height: 110, // aumenta altura da imagem
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  destaqueBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#2563eb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  destaqueTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  cardBody: {
    padding: 12, // padding um pouco maior
  },
  titulo: {
    fontSize: 16, // fonte um pouco maior
    fontWeight: "bold",
    color: "#2563eb",
  },
  subtitulo: {
    fontSize: 13, // fonte um pouco maior
    color: "#666",
    marginVertical: 2,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginVertical: 6,
  },
  tag: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    marginRight: 4,
    marginBottom: 4,
    color: "#2563eb",
  },
  botaoInscreva: {
    backgroundColor: "#2563eb",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
    marginVertical: 8,
  },
  link: {
    color: "#2563eb",
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },
  modalModuloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  modalIcon: {
    marginRight: 8,
  },
  modalModulo: {
    fontSize: 16, // Aumentado o tamanho do texto
    color: "#333",
    textAlign: "left",
  },
  modalBotao: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;