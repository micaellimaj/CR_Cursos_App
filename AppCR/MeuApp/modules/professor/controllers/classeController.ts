import api from '../../../config/api';
import { IClasse, ICreateClassePayload, IClasseResponse } from '../types';
import axios from 'axios';

/**
 * Busca todas as postagens (materiais/avisos) de uma turma específica.
 */
export const getClassesByTurma = async (turmaId: string): Promise<IClasse[]> => {
  try {
    const response = await api.get(`/classes/turma/${turmaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar mural da turma");
    }
    throw new Error("Erro inesperado ao listar postagens da classe");
  }
};

/**
 * Cria uma nova postagem no mural. Suporta múltiplos arquivos e links.
 */
export const createClassePost = async (payload: ICreateClassePayload): Promise<IClasseResponse> => {
  try {
    const formData = new FormData();

    // Campos simples
    formData.append('turma_id', payload.turma_id);
    formData.append('professor_id', payload.professor_id);
    formData.append('titulo', payload.titulo);
    formData.append('tipo', payload.tipo);
    if (payload.descricao) formData.append('descricao', payload.descricao);

    // Adicionando múltiplos links
    if (payload.links && payload.links.length > 0) {
      payload.links.forEach(link => {
        formData.append('links', link);
      });
    }

    // Adicionando múltiplos arquivos
    if (payload.files && payload.files.length > 0) {
      payload.files.forEach(file => {
        formData.append('files', file); // No React Native: { uri, name, type }
      });
    }

    const response = await api.post('/classes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar postagem no mural");
    }
    throw new Error("Erro inesperado ao criar postagem");
  }
};

/**
 * Remove uma postagem do mural.
 */
export const deleteClassePost = async (id: string): Promise<IClasseResponse> => {
  try {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao remover postagem");
    }
    throw new Error("Erro inesperado ao remover postagem");
  }
};

/**
 * Atualiza os dados básicos de uma postagem (título/descrição).
 * Nota: O seu back-end atual não trata novos uploads no PUT de classe via controller.
 */
export const updateClassePost = async (id: string, dados: Partial<IClasse>): Promise<IClasseResponse> => {
  try {
    const response = await api.put(`/classes/${id}`, dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar postagem");
    }
    throw new Error("Erro inesperado ao atualizar postagem");
  }
};