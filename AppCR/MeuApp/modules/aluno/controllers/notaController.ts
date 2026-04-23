import api from '../../../config/api';
import { INota } from '../types';
import axios from 'axios';

/**
 * Busca todas as notas de um aluno específico (Boletim Geral).
 * @param alunoId ID do aluno logado.
 */
export const getNotasByAluno = async (alunoId: string): Promise<INota[]> => {
  try {
    const response = await api.get(`/nota/aluno/${alunoId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao carregar boletim");
    }
    throw new Error("Erro inesperado ao buscar notas");
  }
};

/**
 * Busca as notas de um aluno filtradas por uma disciplina específica.
 * Útil para a tela de detalhes da disciplina.
 */
export const getNotasByDisciplina = async (disciplinaId: string): Promise<INota[]> => {
  try {
    const response = await api.get(`/nota/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar notas desta disciplina");
    }
    throw new Error("Erro inesperado ao listar notas por disciplina");
  }
};

/**
 * Busca os detalhes de uma nota específica pelo ID.
 */
export const getNotaById = async (id: string): Promise<INota> => {
  try {
    const response = await api.get(`/nota/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Nota não encontrada");
    }
    throw new Error("Erro inesperado ao buscar detalhe da nota");
  }
};