export interface IDisciplinaProfessor {
  id: string;
  nome: string;
  cursoId: string;
  professorId: string;
  turmasAssociadas: string[];
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IProfessorProfile {
  id: string;
  full_name: string;
  email: string;
  especialidade?: string;
}

export interface GetDisciplinasResponse {
  data: IDisciplinaProfessor[];
}

export interface ITurmaProfessor {
  id: string;
  nome: string;
  curso_id: string;
  data_inicio: string;
  data_fim: string;
  professor_principal_id: string | null;
  professores: Record<string, boolean> | string[];
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IAlunoTurma {
  id?: string;
  full_name: string;
  email: string;
  data_nascimento: string;
  idade?: number;
  turma_id: string;
  tipo?: 'aluno';
  nome_responsavel?: string;
  email_responsavel?: string;
  telefone_responsavel?: string;
  telefone?: string;
  created_at?: string;
  updated_at?: string;
 
}

export interface INota {
  id?: string;
  valor: number;      
  nota?: number;
  descricao: string; 
  alunoId: string;
  disciplinaId: string;
  turmaId: string;
  professorId: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface NotaResponse {
  message: string;
  id?: string;
  data?: INota;
}

export interface IFrequencia {
  id?: string;
  aluno_id: string;
  turma_id: string;
  disciplina_id: string;
  professor_id: string;
  data: string;
  status: boolean;
  observacao?: string | null;
}

export interface IRegistrarChamadaPayload {
  turma_id: string;
  disciplina_id: string;
  professor_id: string;
  data: string;
  alunos: {
    aluno_id: string;
    status: boolean;
  }[];
}

export interface FrequenciaResponse {
  message: string;
  data?: IFrequencia;
}