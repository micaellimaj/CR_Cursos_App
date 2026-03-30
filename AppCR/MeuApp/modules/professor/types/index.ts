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
  professor_id: string;
  data: string;
  status: boolean;
  observacao?: string | null;
}

export interface IRegistrarChamadaPayload {
  turma_id: string;
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

export interface IProfessor {
  id: string;
  full_name: string;
  email: string;
  senha?: string;
  telefone: string | null;
  data_nascimento: string;
  idade: number;
  turma_id_principal: string | null;
  tipo: 'professor';
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IUpdateProfessorPayload {
  full_name?: string;
  email?: string;
  senha?: string;
  telefone?: string;
  data_nascimento?: string;
  turma_id_principal?: string;
}

export interface IProfessorActionResponse {
  message: string;
}

export type TConteudoTipo = 'texto' | 'arquivo' | 'video' | 'link';

export interface IConteudo {
  id: string;
  disciplinaId: string;
  titulo: string;
  descricao?: string;
  tipo: TConteudoTipo;
  valor?: string | null;
  url?: string | null;
  mimeType?: string | null;
  fileName?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ICreateConteudoPayload {
  disciplinaId: string;
  titulo: string;
  tipo: TConteudoTipo;
  descricao?: string;
  valor?: string;
  url?: string;
  arquivo?: any;
}

export interface IConteudoResponse {
  message: string;
  id?: string;
  data?: IConteudo;
}

export type TAtividadeTipo = 'texto' | 'pdf' | 'slide';

export interface IAtividade {
  id: string;
  titulo: string;
  descricao: string;
  disciplinaId: string;
  tipo: TAtividadeTipo;
  conteudoTexto: string | null;
  urlArquivo: string | null;
  dataEntrega: string | null;
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ICreateAtividadePayload {
  titulo: string;
  disciplinaId: string;
  tipo: TAtividadeTipo;
  descricao?: string;
  conteudoTexto?: string;
  dataEntrega?: string;
  arquivo?: any;
}

export interface IAtividadeResponse {
  message: string;
  id?: string;
  data?: IAtividade;
}

export type TClasseTipo = 'material' | 'aviso' | 'atividade';

export interface IAnexo {
  nome: string;
  url: string;
  tipo: string;
}

export interface IClasse {
  id: string;
  turma_id: string;
  professor_id: string;
  titulo: string;
  descricao: string;
  tipo: TClasseTipo;
  anexos: IAnexo[];
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ICreateClassePayload {
  turma_id: string;
  professor_id: string;
  titulo: string;
  tipo: TClasseTipo;
  descricao?: string;
  links?: string[];
  files?: any[];
}

export interface IClasseResponse {
  message?: string;
  mensagem?: string;
  id?: string;
  classe?: IClasse;
}

export interface IArquivoPrivado {
  nome: string;
  url: string;
  tipo: string;
}

export interface IPrivado {
  id: string;
  professor_id: string;
  aluno_id: string;
  turma_id: string;
  mensagem: string;
  arquivos: IArquivoPrivado[];
  visualizado: boolean;
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IEnviarConteudoPrivadoPayload {
  aluno_id: string;
  turma_id: string;
  mensagem?: string;
  links?: string[];
  files?: any[]; 
}

export interface IPrivadoResponse {
  mensagem?: string;
  message?: string;
  id?: string;
  privado?: IPrivado;
}
