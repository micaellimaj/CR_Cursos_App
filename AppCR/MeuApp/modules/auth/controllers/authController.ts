import api from '../../../config/api';
import { LoginResponse } from '../types'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', {
      email: email.trim(),
      senha: password
    });

    if (response.data.token) {
      await AsyncStorage.setItem('@token', response.data.token);
    }
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.response?.data || "Erro na conexão";
      throw new Error(message);
    }
    throw new Error("Erro inesperado no login");
  }
};