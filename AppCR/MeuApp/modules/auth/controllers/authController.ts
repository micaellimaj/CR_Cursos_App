import api from '../../../config/api';
import { LoginResponse } from '../types'; 
import axios from 'axios';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email: email.trim(),
      senha: password
    });
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data || "Erro na conexão com o servidor";
      throw new Error(message);
    }
    throw new Error("Erro inesperado no login");
  }
};