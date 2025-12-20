const Nota = require('../models/notaModel');
const notaService = require('../notaService');

module.exports = async (turmaId) => {
    if (!turmaId) throw { status: 400, message: "ID da turma é obrigatório." };

    const lista = await notaService.findByTurma(turmaId);
    return lista.map(n => new Nota(n).toJSON());
};