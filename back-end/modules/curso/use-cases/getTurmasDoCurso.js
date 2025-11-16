const cursoService = require('../../services/cursoService');
const turmaService = require('../../services/turmaService');

const getTurmasDoCurso = async (cursoId) => {
    if (!cursoId) {
        throw { status: 400, message: 'O ID do Curso é obrigatório.' };
    }
    const curso = await cursoService.findById(cursoId); 
    if (!curso) {
        throw { status: 404, message: `Curso com ID ${cursoId} não encontrado.` };
    }

    const turmas = await turmaService.getTurmasPorCursoId(cursoId);
    
    return turmas;
};

module.exports = getTurmasDoCurso;