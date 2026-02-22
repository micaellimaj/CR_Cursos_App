import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Cor de fundo para o tema claro
    paddingHorizontal: 16, // Espaçamento lateral
    paddingTop: 5, // Espaçamento no topo
  },
  containerDark: {
    backgroundColor: "#1a202c", // Cor de fundo para o tema escuro
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2563eb", // Azul claro
    textAlign: "center", // Centraliza o título
  },
  titleDark: {
    color: "#63b3ed", // Azul claro para o tema escuro
  },
  contentContainer: {
    paddingBottom: 20, // Espaçamento inferior
  },
  headerSection: {
    marginBottom: 20, // Reduzido o espaçamento entre o título e os temas
    alignItems: "center", // Centraliza o título e a barra de progresso
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 5, // Reduzido o espaçamento acima da barra
    width: "90%", // Ajustado para ocupar 90% da largura
  },
  continueSection: {
    marginBottom: 24,
    alignItems: "center", // Centraliza os itens na seção
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 12,
    textAlign: "center", // Centraliza o texto
  },
  continueTitleDark: {
    color: "#63b3ed",
  },
  continueText: {
    fontSize: 16,
    backgroundColor: "#2563eb",
    color: "white",
    padding: 12,
    borderRadius: 8,
    textAlign: "center", // Centraliza o texto
    width: "80%", // Responsivo: ocupa 80% da largura
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    width: "80%", // Responsivo: ocupa 90% da largura
    alignSelf: "center", // Centraliza o card horizontalmente
  },
  cardDark: {
    backgroundColor: "#2d3748",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#666",
    textAlign: "left", // Centraliza o título do card
  },
  cardTitleDark: {
    color: "#e2e8f0",
  },
  cardTitleInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#2563eb",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  cardTitleInputDark: {
    borderBottomColor: "#63b3ed",
    color: "#e2e8f0",
  },
  cardSubtitle: {
    fontSize: 16,
    marginVertical: 6,
    color: "#333",
    textAlign: "left", // Centraliza o subtítulo do card
  },
  cardSubtitleDark: {
    color: "#cbd5e1",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cardStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    color: "#fff", // Texto branco para contraste
  },
  cardStatusText: {
    fontSize: 14, // Tamanho da fonte
    fontWeight: "bold", // Texto em negrito
    color: "#fff", // Texto branco
    textAlign: "center", // Centraliza o texto
  },
  cardStatusEstudado: {
    backgroundColor: "#4caf50", // Verde agradável para ambos os temas
  },
  cardStatusEstudadoDark: {
    backgroundColor: "#81c784", // Verde mais claro para o tema escuro
  },
  cardStatusNaoEstudado: {
    backgroundColor: "#b0bec5", // Cinza suave para ambos os temas
  },
  cardStatusNaoEstudadoDark: {
    backgroundColor: "#78909c", // Cinza mais escuro para o tema escuro
  },
  uploadSection: {
    marginTop: 20, // Reduzido o espaçamento superior
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    width: "80%", // Responsivo: ocupa 90% da largura
    alignSelf: "center", // Centraliza a seção horizontalmente
  },
  uploadSectionDark: {
    backgroundColor: "#2d3748",
  },
  uploadTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    color: "#2563eb",
    textAlign: "center", // Centraliza o título
  },
  uploadTitleDark: {
    color: "#63b3ed",
  },
  uploadButton: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    width: "80%", // Responsivo: ocupa 80% da largura
    alignSelf: "center", // Centraliza o botão horizontalmente
  },
  uploadButtonText: {
    color: "white",
    textAlign: "center",
  },
  uploadInstruction: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
  },
  uploadInstructionDark: {
    color: "#cbd5e1",
  },
});

export default styles;