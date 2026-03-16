import api from '../../../config/api';
import { IFrequencia, IRegistrarChamadaPayload, FrequenciaResponse } from '../types';
import axios from 'axios';

/**
 * Registra a chamada de vários alunos ao mesmo tempo (Batch)
 * Rota: POST /frequencia
 */
export const registrarChamada = async (payload: IRegistrarChamadaPayload): Promise<void> => {
  try {
    // O back-end valida o formato DD/MM/AAAA no payload.data
    await api.post('/frequencia', payload);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao registrar chamada");
    }
    throw new Error("Erro inesperado ao salvar frequência");
  }
};

/**
 * Busca o histórico de frequências de uma turma
 * Rota: GET /frequencia/turma/:turmaId
 */
export const getFrequenciaPorTurma = async (turmaId: string): Promise<IFrequencia[]> => {
  try {
    const response = await api.get(`/frequencia/turma/${turmaId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    return [];
  }
};

/**
 * Atualiza um registro individual de frequência (ex: professor errou ao marcar falta)
 * Rota: PUT /frequencia/:id
 */
export const atualizarFrequencia = async (id: string, status: boolean, observacao?: string): Promise<void> => {
  try {
    await api.put(`/frequencia/${id}`, { status, observacao });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar registro");
    }
  }
};

/**
 * Deleta um registro de frequência
 * Nota: Seu back exige verificarAdmin no delete, mas incluímos caso o professor tenha permissão.
 * Rota: DELETE /frequencia/:id
 */
export const excluirFrequencia = async (id: string): Promise<void> => {
  try {
    await api.delete(`/frequencia/${id}`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao excluir registro");
    }
  }
};