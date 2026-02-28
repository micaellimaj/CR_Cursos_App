export interface UserData {
  id: string;
  nome: string;
  email: string;
  tipo: 'aluno' | 'professor' | 'admin';
}

export interface LoginResponse {
  token: string;
  id: string;
  tipo: 'aluno' | 'professor' | 'admin';
  nome: string;
  email?: string;
}