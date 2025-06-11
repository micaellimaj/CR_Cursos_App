import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const getDynamicStyles = (isLightTheme: boolean) => ({
  container: {
    backgroundColor: isLightTheme ? "#e0f2fe" : "#1e3a8a", // Azul claro para claro, azul escuro para escuro
  },
  content: {
    backgroundColor: isLightTheme ? "#e0f2fe" : "#1e3a8a", // Fundo do conteúdo
  },
  input: {
    backgroundColor: isLightTheme ? "#e0f2fe" : "#1e3a8a", // Fundo dos inputs
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    paddingHorizontal: 20, // Espaçamento lateral
  },
  containerLight: {
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#1a202c",
  },
  content: {
    width: "100%",
    maxWidth: 400, // Limita a largura máxima para telas maiores
    padding: 20,
    borderRadius: 10, // Bordas arredondadas
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 5, // Espaçamento maior abaixo da logo
  },
  logoImage: {
    width: 180, // Aumentei o tamanho da logo
    height: 180,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  inputLight: {
    borderColor: "#dddfe2",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  inputDark: {
    borderColor: "#374151",
    backgroundColor: "#2d3748",
    color: "#e2e8f0",
  },
  loginButton: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonLight: {
    backgroundColor: "#2563eb",
  },
  loginButtonDark: {
    backgroundColor: "#63b3ed",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1877f2",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#dddfe2",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#65676b",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    height: 50, // Altura padronizada
  },
  googleButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dddfe2",
  },
  googleText: {
    fontWeight: "500",
    color: "#2e2f33",
  },
  createAccountButton: {
    backgroundColor: "#42b72a", // Verde para o tema claro
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 50, // Altura padronizada
    marginHorizontal: 4,
  },
  createAccountButtonDark: {
    backgroundColor: "#16a34a", // Verde para o tema escuro
  },
  createAccountText: {
    color: "#fff", // Texto branco
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;