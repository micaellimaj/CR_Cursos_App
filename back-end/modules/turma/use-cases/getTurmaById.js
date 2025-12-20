const Turma = require('../models/turmaModel');
const turmaService = require('../turmaService');

module.exports = async (id) => {
    if (!id) throw { status: 400, message: 'O ID da Turma é obrigatório.' };

    const dados = await turmaService.getTurmaPorId(id);

    if (!dados) {
        throw { status: 404, message: `Turma com ID ${id} não encontrada.` };
    }

    return new Turma({ id, ...dados }).toJSON();
};