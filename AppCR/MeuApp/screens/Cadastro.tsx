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
import stylesCadastro from "../styles/stylesCadastro";// Seu arquivo de estilos
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Importe o axios para manter a consistência com seu LoginScreen
import { API_URL } from '@env'; // Importa API_URL do seu ambiente

// Estrutura dos dados do usuário
type Usuario = {
  id: string; // matrícula ou ID único no banco de dados
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
  const [modalInfo, setModalInfo] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Função para buscar o token de autenticação
  const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log("LOG: Token recuperado do AsyncStorage:", token ? "Token presente" : "Token ausente ou nulo"); // Adicione este log
    if (token) {
          // Opcional: decodificar o JWT para verificar o payload no frontend (apenas para depuração!)
          // const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
          // console.log("LOG: Payload do Token (depuração):", decoded);
      }
      setAuthToken(token);
      return token;
    } catch (error) {
      console.error("LOG: Erro ao obter token do AsyncStorage:", error);
      return null;
    }
  };

  // Função para buscar todos os alunos e professores
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const token = authToken || await getToken(); // Tenta usar o token do estado ou busca
    if (!token) {
      Alert.alert("Erro de Autenticação", "Não foi possível obter o token de autenticação. Por favor, faça login novamente.");
      setLoading(false);
      // Opcional: Navegar para a tela de login
      // navigation.navigate('Login');
      return;
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Inclua o token de autenticação
      };
      console.log("LOG: FetchUsers - Enviando requisição GET para /alunos com headers:", headers);

      // Busca Alunos
      const alunosResponse = await axios.get(`${API_URL}/api/alunos`, { headers });
      const alunosData: Usuario[] = alunosResponse.data;
      console.log("LOG: Resposta de /alunos:", alunosData.length, "alunos encontrados.");

      // Busca Professores
      console.log("LOG: FetchUsers - Enviando requisição GET para /professores com headers:", headers);
      const professoresResponse = await axios.get(`${API_URL}/api/professores`, { headers });
      const professoresData: Usuario[] = professoresResponse.data;
      console.log("LOG: Resposta de /professores:", professoresData.length, "professores encontrados.");

      // Combina e atualiza o estado
      setUsuarios([...alunosData, ...professoresData]);
    } catch (error: any) {
      // Log detalhado do erro da API
      if (axios.isAxiosError(error) && error.response) {
        console.error("LOG: Erro ao buscar usuários (detalhes da resposta da API):", error.response.status, error.response.data);
        Alert.alert("Erro", `Não foi possível carregar a lista de usuários: ${error.response.data?.message || error.message}`);
      } else {
        console.error("LOG: Erro ao buscar usuários (geral):", error.message);
        Alert.alert("Erro", `Não foi possível carregar a lista de usuários: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    // Primeiro, tenta buscar o token ao montar
    getToken().then((token) => {
      if (token) {
        setAuthToken(token); // Atualiza o estado do token
        fetchUsers(); // Chama fetchUsers assim que o token estiver disponível
      } else {
        // Lógica para lidar com a falta de token (ex: redirecionar para login)
        setLoading(false);
      }
    });
  }, [fetchUsers]); // fetchUsers como dependência para que useEffect reaja a mudanças nela

  // Handler para deletar usuário (aluno ou professor)
  const handleDelete = (user: Usuario) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir este cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const endpoint = user.userType === "student" ? "alunos" : "professores";
          try {
            console.log(`LOG: handleDelete - Tentando excluir usuário ${user.id} (${user.userType}) em ${API_URL}/api/${endpoint}/${user.id} com token:`, authToken ? "presente" : "ausente");
            const response = await axios.delete(`${API_URL}/api/${endpoint}/${user.id}`, {
              headers: {
                "Authorization": `Bearer ${authToken}`,
              },
            });
            // ... (restante do handleDelete) ...
          } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                console.error("LOG: Erro ao excluir usuário (detalhes da resposta da API):", error.response.status, error.response.data);
                Alert.alert("Erro", `Não foi possível excluir o usuário: ${error.response.data?.message || error.message}`);
            } else {
                console.error("LOG: Erro ao excluir usuário (geral):", error.message);
                Alert.alert("Erro", `Não foi possível excluir o usuário: ${error.message}`);
            }
          }
        },
      },
    ]);
  };

  // Handler para iniciar a edição
  const handleEdit = (user: Usuario) => {
    setEditUser(user);
    setModalEdit(true);
  };

  // Handler para salvar edições
  const handleSaveEdit = async () => {
    if (!editUser) return;
    const endpoint = editUser.userType === "student" ? "alunos" : "professores";
    try {
      console.log(`LOG: handleSaveEdit - Tentando atualizar usuário ${editUser.id} (${editUser.userType}) em ${API_URL}/api/${endpoint}/${editUser.id} com token:`, authToken ? "presente" : "ausente");
      const response = await axios.put(`${API_URL}/api/${endpoint}/${editUser.id}`, editUser, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });
      // ... (restante do handleSaveEdit) ...
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            console.error("LOG: Erro ao salvar edição (detalhes da resposta da API):", error.response.status, error.response.data);
            Alert.alert("Erro", `Não foi possível atualizar o usuário: ${error.response.data?.message || error.message}`);
        } else {
            console.error("LOG: Erro ao salvar edição (geral):", error.message);
            Alert.alert("Erro", `Não foi possível atualizar o usuário: ${error.message}`);
        }
    }
  };

  // Handler para mudar o tipo de usuário (aluno/professor)
  // Requer a exclusão do registro atual e a criação de um novo registro no tipo desejado no backend
  const handleChangeUserType = async (user: Usuario) => {
    Alert.alert(
      "Atenção",
      "Alterar o tipo de usuário (Aluno/Professor) irá deletar o registro atual e criar um novo no tipo desejado. Deseja continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Continuar",
          onPress: async () => {
            const currentEndpoint = user.userType === "student" ? "alunos" : "professores";
            const newType = user.userType === "student" ? "teacher" : "student";
            const newEndpoint = newType === "student" ? "alunos" : "professores";

            try {
              // 1. Deletar do tipo atual
              console.log(`LOG: handleChangeUserType - Tentando deletar usuário ${user.id} (${user.userType}) em ${API_URL}/api/${currentEndpoint}/${user.id} com token:`, authToken ? "presente" : "ausente");
              const deleteResponse = await axios.delete(`${API_URL}/api/${currentEndpoint}/${user.id}`, {
                headers: { "Authorization": `Bearer ${authToken}` },
              });
              if (deleteResponse.status !== 200 && deleteResponse.status !== 204) {
                 throw new Error(`Erro ao deletar do tipo atual: ${deleteResponse.status}`);
              }

              // 2. Criar no novo tipo
              const newUserPayload = { ...user, userType: newType };
              // Remova o ID para o POST, pois o backend deve gerar um novo ID na criação
              delete (newUserPayload as any).id; 
              console.log(`LOG: handleChangeUserType - Tentando criar novo usuário em ${API_URL}/api/${newEndpoint} com token:`, authToken ? "presente" : "ausente");
              const createResponse = await axios.post(`${API_URL}/api/${newEndpoint}`, newUserPayload, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${authToken}`,
                },
              });
              const createdUser: Usuario = createResponse.data;

              // Atualiza o estado: remove o antigo e adiciona o novo
              setUsuarios((prev) => [
                ...prev.filter((u) => u.id !== user.id),
                createdUser,
              ]);
              Alert.alert("Sucesso", `Tipo de usuário alterado para ${newType === "student" ? "Aluno" : "Professor"}!`);
            } catch (error: any) {
              console.error("Erro ao mudar tipo de usuário:", error.response?.data || error.message);
              Alert.alert("Erro", `Não foi possível alterar o tipo de usuário: ${error.response?.data?.message || error.message}.`);
            }
          },
        },
      ]
    );
  };


  const handleNewRegistrationPress = () => {
    // Ação para navegar para a tela de registro de usuário.
    // Ex: navigation.navigate('RegisterScreen');
    Alert.alert("Navegação", "Navegar para a tela de registro de usuário.");
    console.log("Navegar para RegisterScreen");
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
              )
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
    </SafeAreaView>
  );
}

