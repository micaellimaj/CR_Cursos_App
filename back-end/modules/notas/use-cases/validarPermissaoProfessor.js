const turmaService = require('../../turma/turmaService');
const disciplinaService = require('../../disciplina/disciplinaService');

module.exports = async (professorId, turmaId, disciplinaId, alunoId) => {
    const turma = await turmaService.getTurmaPorId(turmaId);
    if (!turma) throw { status: 404, message: "Turma não encontrada." };

    const professorNaTurma = turma.professores && turma.professores[professorId];
    if (!professorNaTurma) {
        throw { status: 403, message: "Este professor não tem permissão para esta turma." };
    }

    const disciplina = await disciplinaService.findById(disciplinaId);
    if (!disciplina) throw { status: 404, message: "Disciplina não encontrada." };

    if (disciplina.professorId !== professorId) {
        throw { status: 403, message: "Este professor não é o responsável por esta disciplina." };
    }

    const alunoNaTurma = turma.alunos && turma.alunos[alunoId];
    if (!alunoNaTurma) {
        throw { status: 400, message: "O aluno informado não pertence a esta turma." };
    }

    return true;
};