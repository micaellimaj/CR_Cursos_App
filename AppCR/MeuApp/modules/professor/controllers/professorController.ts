import api from '../../../config/api';
import { IProfessor, IUpdateProfessorPayload, IProfessorActionResponse } from '../types';
import axios from 'axios';

/**
 * Busca os dados de um professor específico pelo ID.
 * Útil para carregar o perfil do professor logado.
 */
export const getProfessorProfile = async (id: string): Promise<IProfessor> => {
  try {
    const response = await api.get(`/professor/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao carregar dados do perfil";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao buscar perfil do professor");
  }
};

/**
 * Atualiza os dados do professor logado.
 */
export const updateProfessorProfile = async (
  id: string, 
  dados: IUpdateProfessorPayload
): Promise<IProfessorActionResponse> => {
  try {
    const response = await api.put(`/professor/${id}`, dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao atualizar seus dados";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao atualizar perfil");
  }
};