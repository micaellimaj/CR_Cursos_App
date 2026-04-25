import api from '../../../config/api';
import { ITurmaAluno } from '../types';
import axios from 'axios';

/**
 * Busca a turma vinculada ao ID do aluno
 */
export const getTurmaByAlunoId = async (alunoId: string): Promise<ITurmaAluno> => {
  try {
    const response = await api.get(`/turma/aluno/${alunoId}`);
    return response.data;
  } catch (error: unknown) {
    throw new Error("Não foi possível localizar sua turma.");
  }
};