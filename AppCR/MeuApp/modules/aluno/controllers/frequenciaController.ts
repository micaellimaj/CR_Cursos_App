import api from '../../../config/api';
import { IFrequencia, IFrequenciaResumoResponse } from '../types';
import axios from 'axios';

/**
 * Busca o histórico de frequências do aluno e o resumo (total de faltas/presenças).
 * @param alunoId ID do aluno logado.
 */
export const getFrequenciaPorAluno = async (alunoId: string): Promise<IFrequenciaResumoResponse> => {
  try {
    const response = await api.get(`/frequencia/aluno/${alunoId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar histórico de frequência");
    }
    throw new Error("Erro inesperado ao buscar frequência");
  }
};

/**
 * Busca todas as frequências de uma turma (caso o aluno precise ver o cronograma da turma).
 */
export const getFrequenciaPorTurma = async (turmaId: string): Promise<IFrequencia[]> => {
  try {
    const response = await api.get(`/frequencia/turma/${turmaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar frequências da turma");
    }
    throw new Error("Erro inesperado ao listar frequências da turma");
  }
};