const Nota = require('../models/notaModel');
const notaService = require('../notaService');

module.exports = async (alunoId) => {
    if (!alunoId) {
        throw { status: 400, message: "O ID do aluno é obrigatório para buscar as notas." };
    }

    const lista = await notaService.findByAluno(alunoId);

    return lista.map(nota => new Nota(nota).toJSON());
};