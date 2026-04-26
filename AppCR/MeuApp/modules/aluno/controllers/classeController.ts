import api from '../../../config/api';
import { IClasse } from '../types';
import axios from 'axios';

/**
 * Busca um conteúdo específico da classe pelo ID.
 */
export const getClasseById = async (id: string): Promise<IClasse> => {
  try {
    const response = await api.get(`/classe/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar conteúdo da aula");
    }
    throw new Error("Erro inesperado ao buscar conteúdo da aula");
  }
};

/**
 * Busca todos os conteúdos/materiais postados para a turma do aluno.
 * @param turmaId O ID da turma que o aluno pertence.
 */
export const getClassesByTurma = async (turmaId: string): Promise<IClasse[]> => {
  try {
    const response = await api.get(`/classe/turma/${turmaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao listar conteúdos da turma");
    }
    throw new Error("Erro inesperado ao listar conteúdos da turma");
  }
};