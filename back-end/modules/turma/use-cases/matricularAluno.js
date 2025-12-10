const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService');

/**
 * Matricular um aluno em uma turma.
 * @param {string} alunoId
 * @param {string} turmaId
 * @returns {object}
 */
const matricularAluno = async ({ alunoId, turmaId }) => {
    if (!alunoId || !turmaId) {
        throw { status: 400, message: 'Os IDs do Aluno e da Turma são obrigatórios para a matrícula.' };
    }

    const aluno = await alunoService.getAlunoPorId(alunoId);
    if (!aluno) {
        throw { status: 404, message: `Aluno com ID ${alunoId} não encontrado.` };
    }
    
    const turma = await turmaService.getTurmaPorId(turmaId);
    if (!turma) {
        throw { status: 404, message: `Turma com ID ${turmaId} não encontrada.` };
    }

    const alunoJaMatriculadoNaTurma = turma.alunos && turma.alunos[alunoId];
    
    if (alunoJaMatriculadoNaTurma) {
        throw { 
            status: 400, 
            message: `O Aluno ${aluno.full_name} já está matriculado nesta turma.`
        };
    }

    await turmaService.adicionarAluno(turmaId, alunoId);
    
    await alunoService.adicionarTurmaAoAluno(alunoId, turmaId);

    return { 
        message: 'Aluno matriculado com sucesso.', 
        alunoId, 
        turmaId, 
        turmaNome: turma.nome,
        cursoNome: turma.curso ? turma.curso.nome : 'N/A' 
    };
};

module.exports = matricularAluno;