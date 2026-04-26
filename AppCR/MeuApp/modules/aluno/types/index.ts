export interface IAluno {
  id: string;
  full_name: string;
  email: string;
  senha?: string;
  data_nascimento: string;
  idade: number;
  turma_id: string;
  tipo: 'aluno';
  nome_responsavel: string | null;
  email_responsavel: string | null;
  telefone_responsavel: string | null;
  telefone: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface IUpdateAlunoPayload {
  full_name?: string;
  email?: string;
  senha?: string;
  data_nascimento?: string;
  telefone?: string;
  nome_responsavel?: string;
  email_responsavel?: string;
  telefone_responsavel?: string;
}

export interface IAlunoResponse {
  message: string;
}

export interface IDisciplina {
  id: string;
  nome: string;
  cursoId: string;
  professorId: string;
  turmasAssociadas: string[];
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export type IDisciplinaList = IDisciplina[];

export interface ICurso {
  id: string;
  nome: string;
  descricao: string;
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export type TConteudoTipo = 'texto' | 'arquivo' | 'video' | 'link';

export interface IConteudo {
  id: string;
  disciplinaId: string;
  titulo: string;
  descricao: string;
  tipo: TConteudoTipo;
  valor: string | null;
  url: string | null;
  mimeType: string | null;
  fileName: string | null;
  created_at: string;
  updated_at: string;
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

export interface INota {
  id: string;
  alunoId: string;
  disciplinaId: string;
  professorId: string;
  turmaId: string;
  valor: number;
  nota?: number;
  descricao: string;
  created_at: string | null;
}


export interface IFrequencia {
  id: string;
  aluno_id: string;
  turma_id: string;
  professor_id: string;
  data: string;
  status: boolean;
  observacao: string | null;
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IFrequenciaResumoResponse {
  alunoId: string;
  resumo: {
    presencas: number;
    faltas: number;
  };
  historico: IFrequencia[];
}

export interface IPrivadoArquivo {
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
  arquivos: IPrivadoArquivo[];
  visualizado: boolean;
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export type TClasseTipo = 'material' | 'aviso' | 'aula';

export interface IClasseAnexo {
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
  anexos: IClasseAnexo[];
  collection: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ITurmaAluno {
  id: string;
  nome: string;
  curso_id: string;
  data_inicio: string;
  data_fim: string;
  collection: string;
}