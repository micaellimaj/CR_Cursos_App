import api from '../../../config/api';
import { IAluno, IUpdateAlunoPayload, IAlunoResponse } from '../types';
import axios from 'axios';

/**
 * Busca os dados de um aluno específico pelo ID.
 */
export const getAlunoById = async (id: string): Promise<IAluno> => {
  try {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar dados do aluno");
    }
    throw new Error("Erro inesperado ao buscar dados do aluno");
  }
};

/**
 * Atualiza os dados do perfil do aluno.
 */
export const updateAluno = async (
  id: string,
  payload: IUpdateAlunoPayload
): Promise<IAlunoResponse> => {
  try {
    const response = await api.put(`/alunos/${id}`, payload);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar perfil");
    }
    throw new Error("Erro inesperado ao atualizar perfil");
  }
};