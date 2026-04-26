import api from '../../../config/api';
import { IDisciplina } from '../types';
import axios from 'axios';

/**
 * Lista todas as disciplinas (Uso interno ou admin).
 */
export const getAllDisciplinas = async (): Promise<IDisciplina[]> => {
  try {
    const response = await api.get('/disciplina');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao listar disciplinas");
    }
    throw new Error("Erro inesperado ao listar disciplinas");
  }
};

/**
 * Busca as disciplinas específicas do curso do aluno.
 * @param cursoId O ID do curso que o aluno está matriculado.
 */
export const getDisciplinasByCurso = async (cursoId: string): Promise<IDisciplina[]> => {
  try {
    const todasDisciplinas = await getAllDisciplinas();
    return todasDisciplinas.filter(disciplina => disciplina.cursoId === cursoId);
  } catch (error) {
    throw error;
  }
};

/**
 * Busca os detalhes de uma disciplina específica.
 */
export const getDisciplinaById = async (id: string): Promise<IDisciplina> => {
  try {
    const response = await api.get(`/disciplina/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar disciplina");
    }
    throw new Error("Erro inesperado ao buscar disciplina");
  }
};