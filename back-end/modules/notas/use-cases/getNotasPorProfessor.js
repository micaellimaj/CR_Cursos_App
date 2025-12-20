const Nota = require('../models/notaModel');
const notaService = require('../notaService');

module.exports = async (professorId) => {
    if (!professorId) throw { status: 400, message: "ID do professor é obrigatório." };

    const lista = await notaService.findByProfessor(professorId);
    return lista.map(n => new Nota(n).toJSON());
};