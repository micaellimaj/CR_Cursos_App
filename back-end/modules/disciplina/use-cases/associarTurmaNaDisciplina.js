const { db } = require("../../../shared/config/firebase");

async function associarTurmaNaDisciplina({ disciplinaId, turmaId, professorId }) {
  if (!disciplinaId || !turmaId || !professorId) {
    return { success: false, message: "Campos obrigatórios faltando." };
  }

  const disciplinaRef = db.ref(`disciplinas/${disciplinaId}`);
  const turmaRef = db.ref(`turmas/${turmaId}`);

  const discSnap = await disciplinaRef.get();
  const turmaSnap = await turmaRef.get();

  if (!discSnap.exists()) {
    return { success: false, message: "Disciplina não encontrada." };
  }

  if (!turmaSnap.exists()) {
    return { success: false, message: "Turma não encontrada." };
  }

  const disciplina = discSnap.val();
  const turma = turmaSnap.val();

  // Verificar se o professor é o responsável
  if (disciplina.professorId !== professorId || turma.professorId !== professorId) {
    return {
      success: false,
      message: "Professor não autorizado a associar esta turma à disciplina.",
    };
  }

  // Evitar duplicação
  const turmasAssociadas = disciplina.turmasAssociadas || [];
  if (turmasAssociadas.includes(turmaId)) {
    return {
      success: false,
      message: "Turma já está associada a esta disciplina.",
    };
  }

  turmasAssociadas.push(turmaId);

  await disciplinaRef.update({ turmasAssociadas });

  return {
    success: true,
    message: "Turma associada à disciplina com sucesso!",
    data: {
      disciplinaId,
      turmaId,
      professorId,
    },
  };
}

module.exports = { associarTurmaNaDisciplina };
