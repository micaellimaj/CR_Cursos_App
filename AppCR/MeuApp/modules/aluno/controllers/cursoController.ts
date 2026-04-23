import api from '../../../config/api';
import { ICurso } from '../types';
import axios from 'axios';

/**
 * Lista todos os cursos disponíveis.
 */
export const getAllCursos = async (): Promise<ICurso[]> => {
  try {
    const response = await api.get('/curso');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Capturando a chave 'erro' que você definiu no cursoController do back
      const message = error.response?.data?.erro || error.response?.data?.message || "Erro ao listar cursos";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao listar cursos");
  }
};

/**
 * Busca detalhes de um curso por ID.
 */
export const getCursoById = async (id: string): Promise<ICurso> => {
  try {
    const response = await api.get(`/curso/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.erro || error.response?.data?.message || "Erro ao buscar curso";
      throw new Error(message);
    }
    throw new Error("Erro inesperado ao buscar curso");
  }
};