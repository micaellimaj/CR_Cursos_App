const disciplinaService = require('../disciplinaService');
const turmaService = require('../../turma/turmaService');

module.exports = async ({ disciplinaId, turmaId, professorId }) => {
  if (!disciplinaId || !turmaId || !professorId) {
    throw { status: 400, message: "Campos obrigatórios faltando." };
  }

  const [disciplina, turma] = await Promise.all([
    disciplinaService.findById(disciplinaId),
    turmaService.getTurmaPorId(turmaId)
  ]);

  if (!disciplina) throw { status: 404, message: "Disciplina não encontrada." };
  if (!turma) throw { status: 404, message: "Turma não encontrada." };

  const professorAutorizado =
    disciplina.professorId === professorId ||
    turma.professor_principal_id === professorId ||
    (turma.professores && turma.professores[professorId] === true);

  if (!professorAutorizado) {
    throw { status: 403, message: "Professor não autorizado para esta operação." };
  }

  const turmasAssociadas = disciplina.turmasAssociadas || [];
  if (turmasAssociadas.includes(turmaId)) {
    throw { status: 400, message: "Turma já está associada a esta disciplina." };
  }

  turmasAssociadas.push(turmaId);
  await disciplinaService.update(disciplinaId, { turmasAssociadas });

  return {
    message: "Turma associada à disciplina com sucesso!",
    data: { disciplinaId, turmaId }
  };
};