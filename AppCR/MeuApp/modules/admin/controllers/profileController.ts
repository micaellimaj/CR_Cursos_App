import api from '../../../config/api';
import { IAdmin, AdminProfileResponse, GenericResponse } from '../types';
import axios from 'axios';

// GET - Buscar perfil do Admin logado
export const getAdminProfile = async (): Promise<AdminProfileResponse> => {
  try {
    const response = await api.get<AdminProfileResponse>('/administradores/me');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao buscar perfil do administrador";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao buscar perfil");
  }
};

// PUT - Atualizar perfil do Admin logado
export const updateAdminProfile = async (dados: Partial<IAdmin>): Promise<GenericResponse> => {
  try {
    const response = await api.put<GenericResponse>('/administradores/update', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao atualizar perfil do administrador";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao atualizar perfil");
  }
};