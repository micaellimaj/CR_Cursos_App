import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2563eb",
    borderRadius: 20,
    padding: 5,
  },
  section: {
    marginBottom: 20,
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
    flex: 1,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    borderColor: "#dddfe2",
    color: "#333",
  },
  email: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  iconButton: {
    marginLeft: 10,
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