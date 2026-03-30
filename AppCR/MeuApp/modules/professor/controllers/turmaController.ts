import api from '../../../config/api';
import { ITurmaProfessor, IAlunoTurma } from '../types';
import axios from 'axios';

/**
 * Busca apenas as turmas associadas ao professor logado
 */
export const getMyTurmas = async (professorId: string): Promise<ITurmaProfessor[]> => {
  try {
    const response = await api.get('/turma');
    const allTurmas: ITurmaProfessor[] = Array.isArray(response.data) ? response.data : [];

    return allTurmas.filter(turma => {
      const isPrincipal = turma.professor_principal_id === professorId;
      
      const isInProfessores = turma.professores && 
        (Array.isArray(turma.professores) 
          ? turma.professores.includes(professorId) 
          : Object.keys(turma.professores).includes(professorId));

      return isPrincipal || isInProfessores;
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar turmas");
    }
    throw new Error("Erro inesperado");
  }
};

/**
 * Busca a lista de alunos de uma turma específica
 */
export const getAlunosDaTurma = async (turmaId: string): Promise<IAlunoTurma[]> => {
  try {
    const response = await api.get(`/turma/${turmaId}/alunos`);

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.data)) {
      return response.data.data;
    }

    return [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar alunos da turma");
    }
    throw new Error("Erro inesperado ao carregar alunos");
  }
};