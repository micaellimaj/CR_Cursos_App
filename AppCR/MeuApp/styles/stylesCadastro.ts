import { StyleSheet } from "react-native";

const stylesCadastro = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    padding: 8, // padding menor para responsividade
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 15,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 2,
    minWidth: 700, // garante responsividade horizontal
  },
  th: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "left",
    marginRight: 8,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f5f6f7",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: "center",
    minWidth: 700, // garante responsividade horizontal
  },
  td: {
    color: "#222",
    fontSize: 13,
    marginRight: 8,
    flexShrink: 1,
    maxWidth: 180,
  },
  iconBtn: {
    marginRight: 8,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "95%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "stretch",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dddfe2",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: "#f5f6f7",
    color: "#222",
  },
  saveBtn: {
    backgroundColor: "#42b72a",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelBtn: {
    backgroundColor: "#aaa",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  radioBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2563eb",
    marginRight: 8,
  },
  radioBtnSelected: {
    backgroundColor: "#2563eb",
  },
  radioLabel: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  radioLabelSelected: {
    color: "#fff",
  },
  infoText: {
    color: "#222",
    fontSize: 14,
    marginBottom: 2,
  },
  infoTextDark: {
    color: "#e2e8f0",
  },
  // Adicione estilos para dark mode:
  tableRowDark: {
    backgroundColor: "#1e293b",
    borderBottomColor: "#334155",
  },
  tdDark: {
    color: "#e2e8f0",
  },
  modalContentDark: {
    backgroundColor: "#1e293b",
  },
  inputDark: {
    backgroundColor: "#334155",
    color: "#e2e8f0",
    borderColor: "#475569",
  },
});

export default stylesCadastro;