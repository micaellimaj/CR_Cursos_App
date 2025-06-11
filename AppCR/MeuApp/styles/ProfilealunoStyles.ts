import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // A cor de fundo será definida diretamente no componente para flexibilidade do tema
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 30, // Aumentado para dar mais espaço na rolagem
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20, // Espaçamento do topo para SafeAreaView
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    // A cor será definida no componente para flexibilidade do tema
  },
  // --- ESTILOS ADICIONADOS / AJUSTADOS ---
  card: { // ESTILO ADICIONADO: Usado para blocos de informação (como Dados Institucionais, Meus Dados)
    backgroundColor: '#FFFFFF', // Cor de fundo padrão para o card (ajustável pelo tema)
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  course: { // ESTILO ADICIONADO: para o texto do curso no cabeçalho
    fontSize: 16,
    opacity: 0.8,
    marginTop: 5,
    // A cor será definida no componente para flexibilidade do tema
  },
  divider: { // ESTILO ADICIONADO: para separar visualmente seções ou itens (se você for usar)
    height: 1,
    backgroundColor: '#E0E0E0', // Cor da linha divisória
    marginVertical: 10,
  },
  value: { // ESTILO ADICIONADO: para os valores exibidos nos dados
    fontSize: 16,
    flex: 1, // Ocupa o espaço restante na linha
    // A cor será definida no componente para flexibilidade do tema
  },
  // --- FIM DOS ESTILOS ADICIONADOS / AJUSTADOS ---
  avatarContainer: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2563eb', // Cor da borda
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 5,
  },
  section: { // Mantive o nome 'section', mas ele tem a mesma função de 'card' para o layout atual
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2563eb",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    width: 100, // Largura ajustada para o rótulo
    color: "#555555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45, // Altura padrão para inputs
    borderColor: '#dddfe2', // Cor da borda do input
    backgroundColor: '#f9f9f9', // Cor de fundo do input (se não for transparente)
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0, // Remove padding vertical padrão
    backgroundColor: "transparent", // Fundo transparente para o input
    color: "#333333", // Cor do texto do input
  },
  email: {
    flex: 1,
    fontSize: 16,
    // A cor será definida no componente para flexibilidade do tema
  },
  iconButton: {
    marginLeft: 10,
    padding: 5, // Aumenta a área de toque do botão
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  updateButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;