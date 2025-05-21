import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Cor de fundo para o tema claro
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center", // Centraliza os itens horizontalmente
  },
  containerDark: {
    backgroundColor: "#1a202c", // Cor de fundo para o tema escuro
    alignItems: "center", // Centraliza os itens horizontalmente
  },
  flatListContainer: {
    paddingHorizontal: 16, // Espaçamento lateral para os cards
    alignItems: "center", // Centraliza os cards no eixo horizontal
  },
  card: {
    width: 220, // Aumentado o tamanho dos cards
    backgroundColor: "#fff", // Fundo branco para o card
    borderRadius: 12,
    margin: 16, // Margem ao redor do card
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardDark: {
    backgroundColor: "#2d3748", // Fundo escuro para o tema escuro
  },
  imagem: {
    width: "100%",
    height: 160, // Aumentado o tamanho da imagem
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
    padding: 12,
  },
  titulo: {
    fontSize: 18, // Aumentado o tamanho do título
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center", // Centraliza o texto do título
  },
  subtitulo: {
    fontSize: 14, // Aumentado o tamanho do subtítulo
    color: "#666",
    marginVertical: 4,
    textAlign: "center", // Centraliza o texto do subtítulo
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginVertical: 6,
    justifyContent: "center", // Centraliza as tags
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