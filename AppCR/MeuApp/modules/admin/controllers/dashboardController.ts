import { getAllAlunos } from './alunoController';
import { getAllProfessores } from './professorController';
import { getAllCursos } from './cursoController';
import { getAllDisciplinas } from './disciplinaController';
import { getAllTurmas } from './turmaController';

export const getDashboardStats = async () => {
  try {
    const [alunos, professores, cursos, disciplinas, turmas] = await Promise.all([
      getAllAlunos().catch(() => []),
      getAllProfessores().catch(() => []),
      getAllCursos().catch(() => []),
      getAllDisciplinas().catch(() => []),
      getAllTurmas().catch(() => []),
    ]);

    return {
      totalUsuarios: alunos.length + professores.length,
      totalAlunos: alunos.length,
      totalProfessores: professores.length,
      totalCursos: cursos.length,
      totalDisciplinas: disciplinas.length,
      totalTurmas: turmas.length,
    };
  } catch (error) {
    console.error("Erro ao processar estatísticas:", error);
    throw error;
  }
};