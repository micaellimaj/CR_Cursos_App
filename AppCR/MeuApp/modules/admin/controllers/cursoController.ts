import api from '../../../config/api';
import { ICurso, CreateCursoResponse, GenericResponse } from '../types';
import axios from 'axios';

export const createCurso = async (dados: ICurso): Promise<CreateCursoResponse> => {
  try {
    const response = await api.post<CreateCursoResponse>('/curso', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.erro || "Erro ao cadastrar curso";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao criar curso");
  }
};

export const getAllCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get<ICurso[]>('/curso');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.erro || "Erro ao buscar cursos";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao listar cursos");
  }
};

export const updateCurso = async (id: string, dados: Partial<ICurso>): Promise<GenericResponse> => {
    try {
        const response = await api.put<GenericResponse>(`/curso/${id}`, dados);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
        const message = error.response?.data?.erro || "Erro ao atualizar curso";
        throw new Error(message);
        }
        throw new Error("Erro inesperado ao atualizar curso");
    }
    };

export const deleteCurso = async (id: string): Promise<GenericResponse> => {
  try {
    const response = await api.delete<GenericResponse>(`/curso/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.erro || "Erro ao remover curso";
      throw new Error(message);
    }
    throw new Error("Erro ao deletar curso");
  }
};