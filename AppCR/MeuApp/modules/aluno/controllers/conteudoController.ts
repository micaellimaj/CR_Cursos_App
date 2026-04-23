import api from '../../../config/api';
import { IConteudo } from '../types';
import axios from 'axios';

/**
 * Busca todos os conteúdos vinculados a uma disciplina específica.
 */
export const getConteudosByDisciplina = async (disciplinaId: string): Promise<IConteudo[]> => {
  try {
    const response = await api.get(`/conteudo/disciplina/${disciplinaId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar materiais da disciplina");
    }
    throw new Error("Erro inesperado ao listar conteúdos");
  }
};

/**
 * Busca os detalhes de um conteúdo específico (útil para abrir um texto longo ou detalhes de um anexo).
 */
export const getConteudoById = async (id: string): Promise<IConteudo> => {
  try {
    const response = await api.get(`/conteudo/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Conteúdo não encontrado");
    }
    throw new Error("Erro inesperado ao buscar conteúdo");
  }
};