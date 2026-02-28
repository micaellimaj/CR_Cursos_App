export interface IAluno {
  id?: string;
  full_name: string;
  email: string;
  senha?: string;
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

export interface CreateAlunoResponse {
  id: string;
  message: string;
  curso: string;
}

export interface GenericResponse {
  message: string;
}

export interface IProfessor {
  id?: string;
  full_name: string;
  email: string;
  senha?: string;
  data_nascimento: string;
  idade?: number;
  telefone?: string;
  turma_id_principal?: string;
  especialidade?: string;
  tipo?: 'professor';
  created_at?: string;
}

export interface CreateProfessorResponse {
  id: string;
  message: string;
  turma_associada: string;
}

export interface ICurso {
  id?: string;
  nome: string;
  descricao: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCursoResponse {
  id: string;
  mensagem: string;
  curso: ICurso;
}

export interface IDisciplina {
  id?: string;
  nome: string;
  cursoId: string;
  professorId: string;
  turmasAssociadas?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateDisciplinaResponse {
  id: string;
  message: string;
  data: IDisciplina;
}

export interface ITurma {
  id?: string;
  nome: string;
  curso_id: string;
  data_inicio: string;
  data_fim: string;
  professor_principal_id?: string | null;
  professores?: Record<string, boolean>;
  alunos?: Record<string, boolean>;
  created_at?: string;
  updated_at?: string;
}

export interface CreateTurmaResponse {
  id: string;
  nome: string;
  curso: string;
  message: string;
}