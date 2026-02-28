import api from '../../../config/api';
import { ITurma, CreateTurmaResponse, GenericResponse } from '../types';
import axios from 'axios';

// Listar todas (Tratando o retorno conforme seu padrão de API)
export const getAllTurmas = async (): Promise<ITurma[]> => {
  try {
    const response = await api.get('/turma');
    // Se o back retornar { success: true, data: [...] } use response.data.data
    return Array.isArray(response.data) ? response.data : response.data.data || [];
  } catch (error) {
    throw new Error("Erro ao carregar turmas");
  }
};

export const createTurma = async (dados: ITurma): Promise<CreateTurmaResponse> => {
  try {
    const response = await api.post('/turma', dados);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar turma");
  }
};

export const updateTurma = async (id: string, dados: Partial<ITurma>): Promise<GenericResponse> => {
  try {
    // Rota: PUT /turma/:id
    const response = await api.put(`/turma/${id}`, dados);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao atualizar turma");
  }
};

// Matricular Aluno
export const matricularAluno = async (turmaId: string, alunoId: string): Promise<GenericResponse> => {
  try {
    const response = await api.post(`/turma/${turmaId}/matricular`, { alunoId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro na matrícula");
  }
};

// Associar Professor
export const associarProfessorTurma = async (turmaId: string, professorId: string): Promise<GenericResponse> => {
  try {
    const response = await api.post(`/turma/${turmaId}/professor`, { professorId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao associar professor");
  }
};

export const deleteTurma = async (id: string): Promise<GenericResponse> => {
  try {
    const response = await api.delete(`/turma/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao deletar turma");
  }
};