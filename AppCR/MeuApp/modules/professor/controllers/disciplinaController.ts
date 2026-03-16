import api from '../../../config/api';
import { IDisciplinaProfessor } from '../types';
import axios from 'axios';

/**
 * Busca todas as disciplinas vinculadas ao professor.
 */
export const getMyDisciplinas = async (professorId?: string): Promise<IDisciplinaProfessor[]> => {
  try {
    const response = await api.get('/disciplina');
    
    const allDisciplinas: IDisciplinaProfessor[] = Array.isArray(response.data) 
      ? response.data 
      : response.data?.data || [];

    if (professorId) {
      return allDisciplinas.filter(d => d.professorId === professorId);
    }

    return allDisciplinas;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao carregar suas disciplinas";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao buscar disciplinas do professor");
  }
};

/**
 * Busca detalhes de uma disciplina específica (apenas leitura)
 */
export const getDisciplinaDetails = async (id: string): Promise<IDisciplinaProfessor> => {
  try {
    const response = await api.get(`/disciplina/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar detalhes da disciplina");
    }
    throw new Error("Erro inesperado");
  }
};