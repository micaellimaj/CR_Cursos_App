const turmaService = require('../turmaService');
const { getProfessorByIdService, adicionarTurmaAoProfessor } = require('../../professor/professorService');

module.exports = async ({ professorId, turmaId }) => {
  if (!professorId || !turmaId) {
    throw { status: 400, message: 'IDs do Professor e da Turma são obrigatórios.' };
  }

  const professor = await getProfessorByIdService(professorId);
  if (!professor) throw { status: 404, message: 'Professor não encontrado.' };

  const turma = await turmaService.getTurmaPorId(turmaId);
  if (!turma) throw { status: 404, message: 'Turma não encontrada.' };

  if (turma.professores && turma.professores[professorId]) {
    throw { status: 400, message: `O Professor ${professor.full_name} já está nesta turma.` };
  }

  await turmaService.adicionarProfessor(turmaId, professorId);
  await adicionarTurmaAoProfessor(professorId, turmaId);

  return { 
    message: 'Professor associado com sucesso.', 
    professor: professor.full_name,
    turma: turma.nome
  };
};