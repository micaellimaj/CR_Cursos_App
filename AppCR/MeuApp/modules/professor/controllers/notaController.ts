import api from '../../../config/api';
import { INota, NotaResponse } from '../types';
import axios from 'axios';

/**
 * Lança uma nova nota (POST /nota)
 */
export const criarNota = async (dados: INota): Promise<NotaResponse> => {
  try {
    const response = await api.post<NotaResponse>('/nota', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao criar nota");
    }
    throw new Error("Erro inesperado");
  }
};

/**
 * Atualiza uma nota existente (PUT /nota/:id)
 */
export const atualizarNota = async (id: string, valorNota: number, descricao?: string): Promise<NotaResponse> => {
  try {
    const response = await api.put<NotaResponse>(`/nota/${id}`, { 
      nota: valorNota, 
      descricao 
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar nota");
    }
    throw new Error("Erro inesperado");
  }
};

/**
 * Lista notas de uma turma específica (GET /nota/turma/:turma_id)
 */
export const getNotasPorTurma = async (turmaId: string): Promise<INota[]> => {
  try {
    const response = await api.get(`/nota/turma/${turmaId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: unknown) {
    return [];
  }
};

/**
 * Lista notas de uma disciplina (GET /nota/disciplina/:disciplina_id)
 */
export const getNotasPorDisciplina = async (disciplinaId: string): Promise<INota[]> => {
  try {
    const response = await api.get(`/nota/disciplina/${disciplinaId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: unknown) {
    return [];
  }
};

/**
 * Deleta uma nota (DELETE /nota/:id)
 */
export const deletarNota = async (id: string): Promise<void> => {
  try {
    await api.delete(`/nota/${id}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao deletar nota");
    }
    throw new Error("Erro inesperado");
  }
};