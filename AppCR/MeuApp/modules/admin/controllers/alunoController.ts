import api from '../../../config/api';
import { IAluno, CreateAlunoResponse, GenericResponse } from '../types';
import axios from 'axios';

// POST - Criar Aluno
export const createAluno = async (alunoData: IAluno): Promise<CreateAlunoResponse> => {
  try {
    const response = await api.post<CreateAlunoResponse>('/alunos', alunoData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao cadastrar aluno";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao criar aluno");
  }
};

// GET ALL - Listar todos os Alunos
export const getAllAlunos = async (): Promise<IAluno[]> => {
  try {
    const response = await api.get<IAluno[]>('/alunos');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao buscar lista de alunos";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao buscar alunos");
  }
};

// DELETE - Remover Aluno
export const deleteAluno = async (id: string): Promise<GenericResponse> => {
  try {
    const response = await api.delete<GenericResponse>(`/alunos/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao remover aluno";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao deletar aluno");
  }
};