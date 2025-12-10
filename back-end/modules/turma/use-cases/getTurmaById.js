const turmaService = require('../../turma/turmaService');

const getTurmaById = async (id) => {
    if (!id) {
        throw { status: 400, message: 'O ID da Turma é obrigatório.' };
    }

    const turma = await turmaService.getTurmaPorId(id);

    if (!turma) {
        throw { status: 404, message: `Turma com ID ${id} não encontrada.` };
    }

    return turma;
};

module.exports = getTurmaById;