import api from '../../../config/api';
import { IProfessor, CreateProfessorResponse, GenericResponse } from '../types';
import axios from 'axios';

export const createProfessor = async (dados: IProfessor): Promise<CreateProfessorResponse> => {
  try {
    const response = await api.post<CreateProfessorResponse>('/professores', dados);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao cadastrar professor";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao criar professor");
  }
};

export const getAllProfessores = async (): Promise<IProfessor[]> => {
  try {
    const response = await api.get<IProfessor[]>('/professores');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao buscar professores";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};

export const deleteProfessor = async (id: string): Promise<GenericResponse> => {
  try {
    const response = await api.delete<GenericResponse>(`/professores/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erro ao remover professor";
      throw new Error(message);
    }
    throw new Error("Erro inesperado");
  }
};