import api from '../../../config/api';
import { IPrivado } from '../types';
import axios from 'axios';

/**
 * Busca as mensagens/conteúdos privados enviados especificamente para o aluno.
 * @param alunoId O ID do aluno logado.
 */
export const getConteudoPrivadoByAluno = async (alunoId: string): Promise<IPrivado[]> => {
  try {
    const response = await api.get(`/privado/aluno/${alunoId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar mensagens privadas do professor"
      );
    }
    throw new Error("Erro inesperado ao buscar conteúdos privados");
  }
};