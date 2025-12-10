const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService'); 

/**
 * Lista todos os alunos matriculados em uma turma específica.
 * @param {string} turmaId
 * @returns {Array<object>}
 */
const getAlunosDaTurma = async (turmaId) => {
    if (!turmaId) {
        throw { status: 400, message: 'O ID da Turma é obrigatório.' };
    }

    const turma = await turmaService.getTurmaPorId(turmaId);
    if (!turma) {
        throw { status: 404, message: `Turma com ID ${turmaId} não encontrada.` };
    }
    
    const alunosDaTurma = turma.alunos;
    
    if (!alunosDaTurma || Object.keys(alunosDaTurma).length === 0) {
        return [];
    }

    const alunoIds = Object.keys(alunosDaTurma);
    
    const promessasAlunos = alunoIds.map(async (alunoId) => {
        const aluno = await alunoService.getAlunoPorId(alunoId);
        if (aluno) {
            const { senha, ...alunoSemSenha } = aluno;
            return { id: alunoId, ...alunoSemSenha };
        }
        return null;
    });

    const alunosComDetalhes = await Promise.all(promessasAlunos);
    
    return alunosComDetalhes.filter(aluno => aluno !== null);
};

module.exports = getAlunosDaTurma;