import api from '../../../config/api';
import { IDisciplina, CreateDisciplinaResponse, GenericResponse } from '../types';
import axios from 'axios';

export const createDisciplina = async (dados: IDisciplina): Promise<CreateDisciplinaResponse> => {
  try {
    const response = await api.post<CreateDisciplinaResponse>('/disciplina', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao criar disciplina";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};

export const getAllDisciplinas = async (): Promise<IDisciplina[]> => {
  try {
    const response = await api.get('/disciplina');

    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    return [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao buscar disciplinas";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};

export const updateDisciplina = async (id: string, dados: Partial<IDisciplina>): Promise<GenericResponse> => {
  try {
    const response = await api.put<GenericResponse>(`/disciplina/${id}`, dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao atualizar disciplina";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};

export const deleteDisciplina = async (id: string): Promise<GenericResponse> => {
  try {
    const response = await api.delete<GenericResponse>(`/disciplina/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao remover disciplina";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};

export const associarTurmaDisciplina = async (dados: { 
  disciplinaId: string, 
  turmaId: string, 
  professorId: string 
}): Promise<GenericResponse> => {
  try {
    const response = await api.post<GenericResponse>('/disciplina/associar-turma', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao associar turma";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao associar turma");
  }
};