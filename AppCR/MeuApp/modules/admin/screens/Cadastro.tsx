import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from '../contexts/ThemeContext';
import stylesCadastro from "../styles/stylesCadastro";

type Usuario = {
  id: string;
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
  const [loading, setLoading] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editUser, setEditUser] = useState<Usuario | null>(null);
  const [modalInfo, setModalInfo] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (user: Usuario) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir este cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setUsuarios((prev) => prev.filter((u) => u.id !== user.id));
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
  };

  const handleChangeUserType = (user: Usuario) => {
    Alert.alert(
      "Atenção",
      "Alterar o tipo de usuário? Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          onPress: () => {
            const newType = user.userType === "student" ? "teacher" : "student";
            setUsuarios((prev) =>
              prev.map((u) =>
                u.id === user.id ? { ...u, userType: newType } : u
              )
            );
          },
        },
      ]
    );
  };

  const handleNewRegistrationPress = () => {
    Alert.alert("Navegação", "Navegar para a tela de registro de usuário.");
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
          onPress={handleNewRegistrationPress}
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
              usuarios.length === 0 ? (
                <Text style={{ color: isLightTheme ? "#666" : "#aaa", padding: 20, textAlign: 'center' }}>Nenhum usuário encontrado.</Text>
              ) : (
                usuarios.map((user) => (
                  <View
                    key={user.id}
                    style={[
                      stylesCadastro.tableRow,
                      !isLightTheme && stylesCadastro.tableRowDark,
                    ]}
                  >
                    <Text style={[stylesCadastro.td, !isLightTheme && stylesCadastro.tdDark, { minWidth: 60 }]}>
                      {user.id}
                    </Text>
                    <Text style={[stylesCadastro.td, !isLightTheme && stylesCadastro.tdDark, { minWidth: 140 }]}>
                      {user.fullName}
                    </Text>
                    <View style={[stylesCadastro.td, { minWidth: 80, flexDirection: "row", alignItems: "center" }]}>
                      <FontAwesome5
                        name={user.userType === "student" ? "user-graduate" : "chalkboard-teacher"}
                        size={16}
                        color={user.userType === "student" ? "#2563eb" : "#16a34a"}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={{ color: isLightTheme ? "#2563eb" : "#60a5fa" }}>
                        {user.userType === "student" ? "Aluno" : "Professor"}
                      </Text>
                    </View>
                    <View style={[stylesCadastro.td, { minWidth: 80, flexDirection: "row" }]}>
                      <TouchableOpacity
                        style={stylesCadastro.iconBtn}
                        onPress={() => {
                          setEditUser(user);
                          setModalInfo(true);
                        }}
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
                        onPress={() => handleDelete(user)}
                      >
                        <Feather name="trash-2" size={18} color="#ef4444" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={stylesCadastro.iconBtn}
                        onPress={() => handleChangeUserType(user)}
                      >
                        <MaterialIcons name="swap-horiz" size={20} color="#16a34a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )
            )}
          </View>
        </ScrollView>
      </View>

      <Modal visible={modalInfo} transparent animationType="slide">
        <View style={stylesCadastro.modalOverlay}>
          <View style={[stylesCadastro.modalContent, !isLightTheme && stylesCadastro.modalContentDark]}>
            <Text style={stylesCadastro.modalTitle}>Informações do Usuário</Text>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ color: isLightTheme ? "#222" : "#e2e8f0" }}>ID: {editUser?.id}</Text>
              <Text style={{ color: isLightTheme ? "#222" : "#e2e8f0" }}>Nome: {editUser?.fullName}</Text>
              <Text style={{ color: isLightTheme ? "#222" : "#e2e8f0" }}>Tipo: {editUser?.userType === "student" ? "Aluno" : "Professor"}</Text>
            </View>
            <TouchableOpacity style={stylesCadastro.cancelBtn} onPress={() => setModalInfo(false)}>
              <Text style={stylesCadastro.cancelBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalEdit} transparent animationType="slide">
        <View style={stylesCadastro.modalOverlay}>
          <View style={[stylesCadastro.modalContent, !isLightTheme && stylesCadastro.modalContentDark]}>
            <Text style={stylesCadastro.modalTitle}>Editar Usuário</Text>
            <TextInput
              style={[stylesCadastro.input, !isLightTheme && stylesCadastro.inputDark]}
              placeholder="Nome Completo"
              value={editUser?.fullName || ""}
              onChangeText={(t) => setEditUser((prev) => prev && { ...prev, fullName: t })}
            />
            <TouchableOpacity style={stylesCadastro.saveBtn} onPress={handleSaveEdit}>
              <Text style={stylesCadastro.saveBtnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesCadastro.cancelBtn} onPress={() => setModalEdit(false)}>
              <Text style={stylesCadastro.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}