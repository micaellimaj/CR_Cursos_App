const Nota = require('../models/notaModel');
const notaService = require('../notaService');

module.exports = async (disciplinaId) => {
    if (!disciplinaId) {
        throw { status: 400, message: "O ID da disciplina é obrigatório para buscar as notas." };
    }

    const lista = await notaService.findByDisciplina(disciplinaId);

    return lista.map(nota => new Nota(nota).toJSON());
};