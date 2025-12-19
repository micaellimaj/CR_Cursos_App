const Curso = require('../models/cursoModel');
const cursoService = require('../cursoService');

module.exports = async (id) => {
    if (!id) {
        throw { status: 400, message: 'O ID do Curso é obrigatório.' };
    }

    const dados = await cursoService.findById(id); 

    if (!dados) {
        throw { status: 404, message: `Curso com ID ${id} não encontrado.` };
    }

    return new Curso({ id, ...dados }).toJSON();
};