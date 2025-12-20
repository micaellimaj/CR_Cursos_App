const turmaService = require('../turmaService');
const alunoService = require('../../aluno/alunoService'); 

module.exports = async (turmaId) => {
    if (!turmaId) throw { status: 400, message: 'O ID da Turma é obrigatório.' };

    const turma = await turmaService.getTurmaPorId(turmaId);
    if (!turma) throw { status: 404, message: 'Turma não encontrada.' };
    
    const alunosIds = turma.alunos ? Object.keys(turma.alunos) : [];
    
    if (alunosIds.length === 0) return [];

    const promessasAlunos = alunosIds.map(async (alunoId) => {
        const aluno = await alunoService.getAlunoPorId(alunoId);
        if (aluno) {
            const { senha, ...alunoLimpo } = aluno;
            return { id: alunoId, ...alunoLimpo };
        }
        return null;
    });

    const resultados = await Promise.all(promessasAlunos);
    return resultados.filter(a => a !== null);
};