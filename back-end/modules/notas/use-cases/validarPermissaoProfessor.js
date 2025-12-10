const { db } = require("../../../shared/config/firebase");

/**
 * Verifica se o professor pode lançar nota para:
 *  - a turma
 *  - a disciplina
 *  - o aluno (se o aluno está na turma)
 */
async function validarPermissaoProfessor(professorId, turmaId, disciplinaId, alunoId) {
  // verificar se o professor pertence à turma
  const turmaSnap = await db.ref(`turmas/${turmaId}`).once("value");
  if (!turmaSnap.exists()) return { ok: false, message: "Turma não encontrada." };

  const turma = turmaSnap.val();

  if (!turma.professores || !turma.professores[professorId]) {
    return { ok: false, message: "Professor não pertence à turma informada." };
  }

  // verificar se a disciplina existe e está vinculada ao professor
  const discSnap = await db.ref(`disciplinas/${disciplinaId}`).once("value");
  if (!discSnap.exists()) return { ok: false, message: "Disciplina não encontrada." };

  const disciplina = discSnap.val();

  if (disciplina.professorId !== professorId) {
    return { ok: false, message: "Professor não é responsável por esta disciplina." };
  }

  // verificar se aluno pertence à turma
  if (!turma.alunos || !turma.alunos[alunoId]) {
    return { ok: false, message: "Aluno não pertence à turma informada." };
  }

  return { ok: true };
}

module.exports = { validarPermissaoProfessor };
