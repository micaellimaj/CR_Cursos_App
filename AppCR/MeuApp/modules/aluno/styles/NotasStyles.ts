import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  containerLight: { backgroundColor: "#fff" },
  containerDark: { backgroundColor: "#1a202c" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  headerLight: { color: "#2563eb" },
  headerDark: { color: "#63b3ed" },
  lista: { marginTop: 20 },
  nota: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  notaLight: { backgroundColor: "#f9f9f9" },
  notaDark: { backgroundColor: "#2d3748" },
  titulo: { fontWeight: "bold", fontSize: 16 },
  tituloLight: { color: "#333" },
  tituloDark: { color: "#e2e8f0" },
  conteudo: { fontSize: 14 },
  conteudoLight: { color: "#666" },
  conteudoDark: { color: "#cbd5e1" },
  falta: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  faltaLight: { backgroundColor: "#e3f2fd" },
  faltaDark: { backgroundColor: "#374151" },
  materia: { fontWeight: "bold", fontSize: 16, flex: 1 },
  materiaLight: { color: "#333" },
  materiaDark: { color: "#e2e8f0" },
  quantidade: { fontSize: 16 },
  quantidadeLight: { color: "#1976d2" },
  quantidadeDark: { color: "#63b3ed" },
  icon: { marginRight: 10 },
});

export default styles;