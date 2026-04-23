import api from '../../../config/api';
import { IAtividade } from '../types';
import axios from 'axios';

/**
 * Lista todas as atividades vinculadas a uma disciplina específica.
 */
export const getAtividadesByDisciplina = async (disciplinaId: string): Promise<IAtividade[]> => {
  try {
    const response = await api.get(`/atividade/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar atividades da disciplina");
    }
    throw new Error("Erro inesperado ao listar atividades");
  }
};

/**
 * Busca os detalhes de uma atividade específica pelo ID.
 */
export const getAtividadeById = async (id: string): Promise<IAtividade> => {
  try {
    const response = await api.get(`/atividade/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Atividade não encontrada");
    }
    throw new Error("Erro inesperado ao buscar atividade");
  }
};