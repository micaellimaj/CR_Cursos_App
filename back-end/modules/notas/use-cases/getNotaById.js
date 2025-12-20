const Nota = require('../models/notaModel');
const notaService = require('../notaService');

module.exports = async (id) => {
    if (!id) {
        throw { status: 400, message: "ID da nota não informado." };
    }

    const dados = await notaService.findById(id);

    if (!dados) {
        throw { status: 404, message: "Nota não encontrada." };
    }

    return new Nota({ id, ...dados }).toJSON();
};