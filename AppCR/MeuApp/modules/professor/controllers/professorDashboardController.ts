import { getMyDisciplinas } from './disciplinaController';
import { getMyTurmas, getAlunosDaTurma } from './turmaController';
import { getConteudosByDisciplina } from './conteudoController';
import { getAtividadesByDisciplina } from './atividadeController';
import { getClassesByTurma } from './classeController';

export interface IProfessorStats {
  meusAlunos: number;
  minhasTurmas: number;
  minhasDisciplinas: number;
  totalConteudos: number;
  totalAtividades: number;
  avisosMural: number;
}

export const getProfessorDashboardStats = async (professorId: string): Promise<IProfessorStats> => {
  try {
    const [disciplinas, turmas] = await Promise.all([
      getMyDisciplinas(professorId),
      getMyTurmas(professorId)
    ]);

    // 1. Alunos Únicos
    const alunosPromises = turmas.map(turma => getAlunosDaTurma(turma.id));
    const resultadosAlunos = await Promise.all(alunosPromises);
    const setAlunosUnicos = new Set();
    resultadosAlunos.forEach(lista => lista.forEach(a => a.id && setAlunosUnicos.add(a.id)));

    // 2. Promessas de Conteúdos, Atividades e Mural
    const conteudosPromises = disciplinas.map(d => getConteudosByDisciplina(d.id));
    const atividadesPromises = disciplinas.map(d => getAtividadesByDisciplina(d.id));
    const muralPromises = turmas.map(t => getClassesByTurma(t.id));

    const [resConteudos, resAtividades, resMural] = await Promise.all([
      Promise.all(conteudosPromises),
      Promise.all(atividadesPromises),
      Promise.all(muralPromises)
    ]);

    return {
      meusAlunos: setAlunosUnicos.size,
      minhasTurmas: turmas.length,
      minhasDisciplinas: disciplinas.length,
      totalConteudos: resConteudos.reduce((acc, lista) => acc + lista.length, 0),
      totalAtividades: resAtividades.reduce((acc, lista) => acc + lista.length, 0),
      avisosMural: resMural.reduce((acc, lista) => acc + lista.length, 0),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao carregar KPIs do professor");
  }
};