import api from '../../../config/api';
import { ITurmaAluno } from '../types';
import axios from 'axios';

/**
 * Busca os detalhes da turma que o aluno pertence
 */
export const getTurmaDoAluno = async (turmaId: string): Promise<ITurmaAluno> => {
  try {
    const response = await api.get(`/turma/${turmaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar dados da turma");
    }
    throw new Error("Erro inesperado ao carregar turma");
  }
};