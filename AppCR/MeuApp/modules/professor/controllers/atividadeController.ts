import api from '../../../config/api';
import { IAtividade, ICreateAtividadePayload, IAtividadeResponse } from '../types';
import axios from 'axios';

/**
 * Lista todas as atividades de uma disciplina.
 */
export const getAtividadesByDisciplina = async (disciplinaId: string): Promise<IAtividade[]> => {
  try {
    const response = await api.get(`/atividade/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar atividades");
    }
    throw new Error("Erro inesperado ao listar atividades");
  }
};

/**
 * Cria uma nova atividade. Suporta upload de arquivo para tipos 'pdf' e 'slide'.
 */
export const createAtividade = async (payload: ICreateAtividadePayload): Promise<IAtividadeResponse> => {
  try {
    const formData = new FormData();

    Object.keys(payload).forEach(key => {
      const value = (payload as any)[key];
      if (value !== undefined && value !== null) {
        if (key === 'arquivo') {
          formData.append('arquivo', value);
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await api.post('/atividade', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar atividade");
    }
    throw new Error("Erro inesperado ao criar atividade");
  }
};

/**
 * Atualiza uma atividade existente. Também permite trocar o arquivo.
 */
export const updateAtividade = async (
  id: string, 
  payload: Partial<ICreateAtividadePayload>
): Promise<IAtividadeResponse> => {
  try {
    const formData = new FormData();

    Object.keys(payload).forEach(key => {
      const value = (payload as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await api.put(`/atividade/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar atividade");
    }
    throw new Error("Erro inesperado ao atualizar atividade");
  }
};

/**
 * Remove uma atividade e seu arquivo do storage.
 */
export const deleteAtividade = async (id: string): Promise<IAtividadeResponse> => {
  try {
    const response = await api.delete(`/atividade/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao remover atividade");
    }
    throw new Error("Erro inesperado ao remover atividade");
  }
};