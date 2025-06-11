import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

// Estrutura dos dados do usuário
type Usuario = {
  id: string; // matrícula
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  userType: "student" | "teacher";
  responsibleFullName?: string;
  responsibleEmail?: string;
  responsiblePhone?: string;
};

export default function Cadastro() {
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [modalCreate, setModalCreate] = useState(false);
  const [newUser, setNewUser] = useState<Usuario>({
    id: "",
    fullName: "",
    birthDate: "",
    phone: "",
    email: "",
    userType: "student",
    responsibleFullName: "",
    responsibleEmail: "",
    responsiblePhone: "",
  });
  const [modalInfo, setModalInfo] = useState(false);

  // Simulação de fetch dos dados (substitua pelo fetch real do Firebase)
  useEffect(() => {
    setLoading(true);
    // Exemplo de fetch (troque pelo seu endpoint Firebase)
    // fetch('URL_DA_API')
    //   .then(res => res.json())
    //   .then(data => setUsuarios(data))
    //   .finally(() => setLoading(false));
    setTimeout(() => {
      setUsuarios([
        {
          id: "2025001",
          fullName: "João da Silva",
          birthDate: "01/01/2005",
          phone: "(11) 99999-9999",
          email: "joao@email.com",
          userType: "student",
          responsibleFullName: "Maria Silva",
          responsibleEmail: "maria@email.com",
          responsiblePhone: "(11) 98888-8888",
        },
        {
          id: "2025002",
          fullName: "Ana Souza",
          birthDate: "10/05/1990",
          phone: "(21) 98888-7777",
          email: "ana@email.com",
          userType: "teacher",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  // CRUD Handlers (ajuste para integração real)
  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir este cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setUsuarios((prev) => prev.filter((u) => u.id !== id));
          // Chame a API de delete aqui
        },
      },
    ]);
  };

  const handleEdit = (user: Usuario) => {
    setEditUser(user);
    setModalEdit(true);
  };

  const handleSaveEdit = () => {
    if (!editUser) return;
    setUsuarios((prev) =>
      prev.map((u) => (u.id === editUser.id ? editUser : u))
    );
    setModalEdit(false);
    // Chame a API de update aqui
  };

  const handleCreate = () => {
    if (!newUser.fullName || !newUser.email || !newUser.id) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }
    setUsuarios((prev) => [...prev, newUser]);
    setModalCreate(false);
    setNewUser({
      id: "",
      fullName: "",
      birthDate: "",
      phone: "",
      email: "",
      userType: "student",
      responsibleFullName: "",
      responsibleEmail: "",
      responsiblePhone: "",
    });
    // Chame a API de create aqui
  };

  const handleChangeUserType = (user: Usuario) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? {
              ...u,
              userType: u.userType === "student" ? "teacher" : "student",
            }
          : u
      )
    );
    // Chame a API de update aqui
  };

  return (
    <SafeAreaView
      style={[
        stylesCadastro.container,
        { backgroundColor: isLightTheme ? "#f5f7fa" : "#0f172a" },
      ]}
    >
      <View style={stylesCadastro.content}>
        <Text
          style={[
            stylesCadastro.title,
            { color: isLightTheme ? "#2563eb" : "#60a5fa" },
          ]}
        >
          Cadastro de Usuários
        </Text>
        <TouchableOpacity
          style={stylesCadastro.addButton}
          onPress={() => setModalCreate(true)}
        >
          <Feather name="user-plus" size={20} color="#fff" />
          <Text style={stylesCadastro.addButtonText}>Novo Cadastro</Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 16 }}
        >
          <View>
            <View style={stylesCadastro.tableHeader}>
              <Text style={[stylesCadastro.th, { minWidth: 60 }]}>ID</Text>
              <Text style={[stylesCadastro.th, { minWidth: 140 }]}>Nome</Text>
              <Text style={[stylesCadastro.th, { minWidth: 80 }]}>Tipo</Text>
              <Text style={[stylesCadastro.th, { minWidth: 80 }]}>Info</Text>
            </View>
            {loading ? (
              <ActivityIndicator color={isLightTheme ? "#2563eb" : "#60a5fa"} />
            ) : (
              usuarios.map((user) => (
                <View
                  key={user.id}
                  style={[
                    stylesCadastro.tableRow,
                    !isLightTheme && stylesCadastro.tableRowDark,
                  ]}
                >
                  <Text
                    style={[
                      stylesCadastro.td,
                      !isLightTheme && stylesCadastro.tdDark,
                      { minWidth: 60 },
                    ]}
                  >
                    {user.id}
                  </Text>
                  <Text
                    style={[
                      stylesCadastro.td,
                      !isLightTheme && stylesCadastro.tdDark,
                      { minWidth: 140 },
                    ]}
                  >
                    {user.fullName}
                  </Text>
                  <View
                    style={[
                      stylesCadastro.td,
                      { minWidth: 80, flexDirection: "row", alignItems: "center" },
                    ]}
                  >
                    <FontAwesome5
                      name={user.userType === "student" ? "user-graduate" : "chalkboard-teacher"}
                      size={16}
                      color={user.userType === "student" ? "#2563eb" : "#16a34a"}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={{
                        color: isLightTheme ? "#2563eb" : "#60a5fa",
                      }}
                    >
                      {user.userType === "student" ? "Aluno" : "Professor"}
                    </Text>
                  </View>
                  <View
                    style={[
                      stylesCadastro.td,
                      { minWidth: 80, flexDirection: "row" },
                    ]}
                  >
                    <TouchableOpacity
                      style={stylesCadastro.iconBtn}
                      onPress={() => setEditUser(user) || setModalInfo(true)}
                    >
                      <Feather name="info" size={18} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={stylesCadastro.iconBtn}
                      onPress={() => handleEdit(user)}
                    >
                      <Feather name="edit" size={18} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={stylesCadastro.iconBtn}
                      onPress={() => handleDelete(user.id)}
                    >
                      <Feather name="trash-2" size={18} color="#ef4444" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={stylesCadastro.iconBtn}
                      onPress={() => handleChangeUserType(user)}
                    >
                      <MaterialIcons
                        name="swap-horiz"
                        size={20}
                        color="#16a34a"
                        style={{ marginLeft: 2 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal Info */}
      <Modal visible={modalInfo} transparent animationType="slide">
        <View style={stylesCadastro.modalOverlay}>
          <View
            style={[
              stylesCadastro.modalContent,
              !isLightTheme && stylesCadastro.modalContentDark,
            ]}
          >
            <Text style={stylesCadastro.modalTitle}>Informações do Usuário</Text>
            <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", fontWeight: "bold", marginBottom: 8 }}>
              Dados do Usuário
            </Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>ID:</Text> {editUser?.id}
              </Text>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Nome:</Text> {editUser?.fullName}
              </Text>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Nascimento:</Text> {editUser?.birthDate}
              </Text>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Telefone:</Text> {editUser?.phone}
              </Text>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Email:</Text> {editUser?.email}
              </Text>
              <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                <Text style={{ fontWeight: "bold" }}>Tipo:</Text> {editUser?.userType === "student" ? "Aluno" : "Professor"}
              </Text>
            </View>
            {editUser?.userType === "student" && (
              <>
                <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", fontWeight: "bold", marginTop: 12, marginBottom: 8 }}>
                  Dados do Responsável
                </Text>
                <View style={{ marginBottom: 8 }}>
                  <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                    <Text style={{ fontWeight: "bold" }}>Nome:</Text> {editUser?.responsibleFullName}
                  </Text>
                  <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                    <Text style={{ fontWeight: "bold" }}>Email:</Text> {editUser?.responsibleEmail}
                  </Text>
                  <Text style={[stylesCadastro.input, { borderWidth: 0, backgroundColor: "transparent", color: isLightTheme ? "#222" : "#e2e8f0", marginBottom: 2 }]}>
                    <Text style={{ fontWeight: "bold" }}>Telefone:</Text> {editUser?.responsiblePhone}
                  </Text>
                </View>
              </>
            )}
            <TouchableOpacity
              style={stylesCadastro.cancelBtn}
              onPress={() => setModalInfo(false)}
            >
              <Text style={stylesCadastro.cancelBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Editar */}
      <Modal visible={modalEdit} transparent animationType="slide">
        <View style={stylesCadastro.modalOverlay}>
          <View
            style={[
              stylesCadastro.modalContent,
              !isLightTheme && stylesCadastro.modalContentDark,
            ]}
          >
            <Text style={stylesCadastro.modalTitle}>Editar Usuário</Text>
            <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", fontWeight: "bold", marginBottom: 8 }}>
              Dados do Usuário
            </Text>
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Nome Completo"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={editUser?.fullName || ""}
              onChangeText={(t) =>
                setEditUser((prev) => prev && { ...prev, fullName: t })
              }
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Nascimento"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={editUser?.birthDate || ""}
              onChangeText={(t) =>
                setEditUser((prev) => prev && { ...prev, birthDate: t })
              }
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Telefone"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={editUser?.phone || ""}
              onChangeText={(t) =>
                setEditUser((prev) => prev && { ...prev, phone: t })
              }
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Email"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={editUser?.email || ""}
              onChangeText={(t) =>
                setEditUser((prev) => prev && { ...prev, email: t })
              }
            />

            {/* Campos do responsável, só se for aluno */}
            {editUser?.userType === "student" && (
              <>
                <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", fontWeight: "bold", marginTop: 12, marginBottom: 8 }}>
                  Dados do Responsável
                </Text>
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Nome do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={editUser?.responsibleFullName || ""}
                  onChangeText={(t) =>
                    setEditUser((prev) => prev && { ...prev, responsibleFullName: t })
                  }
                />
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Email do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={editUser?.responsibleEmail || ""}
                  onChangeText={(t) =>
                    setEditUser((prev) => prev && { ...prev, responsibleEmail: t })
                  }
                />
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Telefone do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={editUser?.responsiblePhone || ""}
                  onChangeText={(t) =>
                    setEditUser((prev) => prev && { ...prev, responsiblePhone: t })
                  }
                />
              </>
            )}

            <TouchableOpacity
              style={stylesCadastro.saveBtn}
              onPress={handleSaveEdit}
            >
              <Text style={stylesCadastro.saveBtnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={stylesCadastro.cancelBtn}
              onPress={() => setModalEdit(false)}
            >
              <Text style={stylesCadastro.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Criar */}
      <Modal visible={modalCreate} transparent animationType="slide">
        <View style={stylesCadastro.modalOverlay}>
          <View
            style={[
              stylesCadastro.modalContent,
              !isLightTheme && stylesCadastro.modalContentDark,
            ]}
          >
            <Text style={stylesCadastro.modalTitle}>Novo Usuário</Text>
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Matrícula (ID)"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={newUser.id}
              onChangeText={(t) => setNewUser((prev) => ({ ...prev, id: t }))}
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Nome Completo"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={newUser.fullName}
              onChangeText={(t) => setNewUser((prev) => ({ ...prev, fullName: t }))}
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Nascimento"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={newUser.birthDate}
              onChangeText={(t) => setNewUser((prev) => ({ ...prev, birthDate: t }))}
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Telefone"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={newUser.phone}
              onChangeText={(t) => setNewUser((prev) => ({ ...prev, phone: t }))}
            />
            <TextInput
              style={[
                stylesCadastro.input,
                !isLightTheme && stylesCadastro.inputDark,
              ]}
              placeholder="Email"
              placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
              value={newUser.email}
              onChangeText={(t) => setNewUser((prev) => ({ ...prev, email: t }))}
            />
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", marginRight: 8 }}>
                Tipo:
              </Text>
              <TouchableOpacity
                style={[
                  stylesCadastro.radioBtn,
                  newUser.userType === "student" && stylesCadastro.radioBtnSelected,
                ]}
                onPress={() => setNewUser((prev) => ({ ...prev, userType: "student" }))}
              >
                <Text
                  style={[
                    stylesCadastro.radioLabel,
                    newUser.userType === "student" && stylesCadastro.radioLabelSelected,
                  ]}
                >
                  Aluno
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  stylesCadastro.radioBtn,
                  newUser.userType === "teacher" && stylesCadastro.radioBtnSelected,
                ]}
                onPress={() => setNewUser((prev) => ({ ...prev, userType: "teacher" }))}
              >
                <Text
                  style={[
                    stylesCadastro.radioLabel,
                    newUser.userType === "teacher" && stylesCadastro.radioLabelSelected,
                  ]}
                >
                  Professor
                </Text>
              </TouchableOpacity>
            </View>
            {newUser.userType === "student" && (
              <>
                <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa", fontWeight: "bold", marginTop: 12, marginBottom: 8 }}>
                  Dados do Responsável
                </Text>
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Nome do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={newUser.responsibleFullName}
                  onChangeText={(t) =>
                    setNewUser((prev) => ({ ...prev, responsibleFullName: t }))
                  }
                />
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Email do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={newUser.responsibleEmail}
                  onChangeText={(t) =>
                    setNewUser((prev) => ({ ...prev, responsibleEmail: t }))
                  }
                />
                <TextInput
                  style={[
                    stylesCadastro.input,
                    !isLightTheme && stylesCadastro.inputDark,
                  ]}
                  placeholder="Telefone do Responsável"
                  placeholderTextColor={isLightTheme ? "#65676b" : "#94a3b8"}
                  value={newUser.responsiblePhone}
                  onChangeText={(t) =>
                    setNewUser((prev) => ({ ...prev, responsiblePhone: t }))
                  }
                />
              </>
            )}
            <TouchableOpacity
              style={stylesCadastro.saveBtn}
              onPress={handleCreate}
            >
              <Text style={stylesCadastro.saveBtnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[stylesCadastro.cancelBtn, { backgroundColor: "#ef4444" }]}
              onPress={() => setModalCreate(false)}
            >
              <Text style={stylesCadastro.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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