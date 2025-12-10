const turmaService = require('../turmaService');
const { getProfessorByIdService, adicionarTurmaAoProfessor } = require('../../professor/professorService');

/**
 * Associa um professor a uma turma existente.
 * @param {string} professorId 
 * @param {string} turmaId
 * @returns {object}
 */
const associarProfessor = async ({ professorId, turmaId }) => {
    if (!professorId || !turmaId) {
        throw { status: 400, message: 'Os IDs do Professor e da Turma são obrigatórios para a associação.' };
    }

    const professor = await getProfessorByIdService(professorId);
    if (!professor) {
        throw { status: 404, message: `Professor com ID ${professorId} não encontrado.` };
    }
    
    const turma = await turmaService.getTurmaPorId(turmaId);
    if (!turma) {
        throw { status: 404, message: `Turma com ID ${turmaId} não encontrada.` };
    }

    const professorJaAssociadoNaTurma = turma.professores && turma.professores[professorId];
    
    if (professorJaAssociadoNaTurma) {
        throw { 
            status: 400, 
            message: `O Professor ${professor.full_name} já está associado a esta turma.`
        };
    }
    
    await turmaService.adicionarProfessor(turmaId, professorId);
    
    await adicionarTurmaAoProfessor(professorId, turmaId);

    return { 
        message: 'Professor associado à turma com sucesso.', 
        professorId, 
        turmaId, 
        turmaNome: turma.nome
    };
};

module.exports = associarProfessor;