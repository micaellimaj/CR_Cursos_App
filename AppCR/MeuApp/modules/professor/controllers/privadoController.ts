import api from '../../../config/api';
import { IPrivado, IEnviarConteudoPrivadoPayload, IPrivadoResponse } from '../types';
import axios from 'axios';

/**
 * Lista todos os conteúdos privados enviados para um aluno específico.
 */
export const getConteudoPrivadoByAluno = async (alunoId: string): Promise<IPrivado[]> => {
  try {
    const response = await api.get(`/privado/aluno/${alunoId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao buscar conteúdos do aluno");
    }
    throw new Error("Erro inesperado ao listar conteúdos privados");
  }
};

/**
 * Envia uma mensagem ou arquivos de forma privada para um aluno.
 */
export const enviarConteudoPrivado = async (payload: IEnviarConteudoPrivadoPayload): Promise<IPrivadoResponse> => {
  try {
    const formData = new FormData();

    formData.append('aluno_id', payload.aluno_id);
    formData.append('turma_id', payload.turma_id);
    
    if (payload.mensagem) formData.append('mensagem', payload.mensagem);

    if (payload.links && payload.links.length > 0) {
      payload.links.forEach(link => formData.append('links', link));
    }

    if (payload.files && payload.files.length > 0) {
      payload.files.forEach(file => formData.append('files', file));
    }

    const response = await api.post('/privado', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao enviar conteúdo privado");
    }
    throw new Error("Erro inesperado ao enviar conteúdo");
  }
};

/**
 * Atualiza uma mensagem privada já enviada.
 * Rota: /privado/:alunoId/:mensagemId
 */
export const updateConteudoPrivado = async (
  alunoId: string, 
  mensagemId: string, 
  mensagem: string
): Promise<IPrivadoResponse> => {
  try {
    const response = await api.put(`/privado/${alunoId}/${mensagemId}`, { mensagem });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao atualizar conteúdo privado");
    }
    throw new Error("Erro inesperado ao atualizar conteúdo");
  }
};

/**
 * Remove um conteúdo privado.
 * Rota: /privado/:alunoId/:mensagemId
 */
export const deleteConteudoPrivado = async (alunoId: string, mensagemId: string): Promise<IPrivadoResponse> => {
  try {
    const response = await api.delete(`/privado/${alunoId}/${mensagemId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao remover conteúdo privado");
    }
    throw new Error("Erro inesperado ao remover conteúdo");
  }
};