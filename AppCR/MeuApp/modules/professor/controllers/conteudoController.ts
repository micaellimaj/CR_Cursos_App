import api from '../../../config/api';
import { IConteudo, ICreateConteudoPayload, IConteudoResponse } from '../types';
import axios from 'axios';

/**
 * Lista todos os conteúdos vinculados a uma disciplina específica.
 */
export const getConteudosByDisciplina = async (disciplinaId: string): Promise<IConteudo[]> => {
  try {
    const response = await api.get(`/conteudo/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar conteúdos da disciplina");
    }
    throw new Error("Erro inesperado ao listar conteúdos");
  }
};

/**
 * Cria um novo conteúdo. Suporta texto, links, vídeos e upload de arquivos.
 */
export const createConteudo = async (payload: ICreateConteudoPayload): Promise<IConteudoResponse> => {
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

    const response = await api.post('/conteudo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar conteúdo");
    }
    throw new Error("Erro inesperado ao criar conteúdo");
  }
};

/**
 * Remove um conteúdo (e o arquivo físico se houver) pelo ID.
 */
export const deleteConteudo = async (id: string): Promise<IConteudoResponse> => {
  try {
    const response = await api.delete(`/conteudo/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao remover conteúdo");
    }
    throw new Error("Erro inesperado ao remover conteúdo");
  }
};

/**
 * Atualiza metadados de um conteúdo (Título, Descrição, etc).
 */
export const updateConteudo = async (id: string, dados: Partial<IConteudo>): Promise<IConteudoResponse> => {
  try {
    const response = await api.put(`/conteudo/${id}`, dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar conteúdo");
    }
    throw new Error("Erro inesperado ao atualizar conteúdo");
  }
};