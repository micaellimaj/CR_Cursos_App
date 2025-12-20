const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService');

module.exports = async ({ alunoId, turmaId }) => {
    if (!alunoId || !turmaId) {
        throw { status: 400, message: 'IDs do Aluno e da Turma são obrigatórios.' };
    }

    const [aluno, turma] = await Promise.all([
        alunoService.getAlunoPorId(alunoId),
        turmaService.getTurmaPorId(turmaId)
    ]);

    if (!aluno) throw { status: 404, message: 'Aluno não encontrado.' };
    if (!turma) throw { status: 404, message: 'Turma não encontrada.' };

    if (turma.alunos && turma.alunos[alunoId]) {
        throw { status: 400, message: `O Aluno ${aluno.full_name} já está matriculado.` };
    }

    await turmaService.adicionarAluno(turmaId, alunoId);
    await alunoService.adicionarTurmaAoAluno(alunoId, turmaId);

    return { 
        message: 'Matrícula realizada com sucesso.', 
        aluno: aluno.full_name,
        turma: turma.nome 
    };
};