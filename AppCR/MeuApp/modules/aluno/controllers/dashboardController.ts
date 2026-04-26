import { getAtividadesByDisciplina } from "./atividadeController";
import { getConteudosByDisciplina } from "./conteudoController";
import { getFrequenciaPorAluno } from "./frequenciaController";
import { getNotasByDisciplina } from "./notaController";
import { getConteudoPrivadoByAluno } from "./privadoController";
import { getDisciplinasByCurso } from "./disciplinaController";
import { getClassesByTurma } from "./classeController";

export const getAlunoDashboardStats = async (alunoId: string, turmaId: string, cursoId: string) => {
  try {
    const disciplinas = await getDisciplinasByCurso(cursoId).catch(() => []);

    const muralPosts = await getClassesByTurma(turmaId).catch(() => []);

    const contagemMural = muralPosts.length;

    const [frequenciaData, mensagensPrivadas, classes] = await Promise.all([
      getFrequenciaPorAluno(alunoId).catch(() => null),
      getConteudoPrivadoByAluno(alunoId).catch(() => []),
      getClassesByTurma(turmaId).catch(() => [])
    ]);

    let totalAtividades = 0;
    let totalMateriaisDisciplina = 0;
    let somaNotas = 0;
    let totalNotasContadas = 0;

    if (disciplinas && disciplinas.length > 0) {
      const detalhesPromessas = disciplinas.map(async (d) => {
        const [atividades, notas, conteudos] = await Promise.all([
          getAtividadesByDisciplina(d.id).catch(() => []),
          getNotasByDisciplina(d.id).catch(() => []),
          getConteudosByDisciplina(d.id).catch(() => []),
        ]);
        return { atividades, notas, conteudos };
      });

      const resultados = await Promise.all(detalhesPromessas);

      resultados.forEach((res) => {
        totalAtividades += res.atividades?.length || 0;
        totalMateriaisDisciplina += res.conteudos?.length || 0;
        res.notas?.forEach((n) => {
          somaNotas += n.valor || n.nota || 0;
          totalNotasContadas++;
        });
      });
    }

    let presencaTotal = "0%";
    if (frequenciaData && frequenciaData.resumo) {
      const { presencas, faltas } = frequenciaData.resumo;
      const totalAulas = presencas + faltas;
      presencaTotal = totalAulas > 0 ? `${Math.round((presencas / totalAulas) * 100)}%` : "0%";
    }

    return {
      disciplinas: disciplinas.length,
      atividades: totalAtividades,
      mediaGeral: totalNotasContadas > 0 ? (somaNotas / totalNotasContadas).toFixed(1) : "0.0",
      presencaTotal,
      materiaisNovos: contagemMural,
      mensagensPrivadas: mensagensPrivadas?.length || 0,
    };
  } catch (error) {
    console.error("Erro fatal no dashboardController:", error);
    throw error;
  }
};