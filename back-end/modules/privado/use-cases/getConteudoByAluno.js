const Privado = require('../models/privadoModel');
const privadoService = require('../privadoService');

module.exports = async (alunoId) => {
    if (!alunoId) {
        throw { status: 400, message: 'ID do aluno é obrigatório.' };
    }

    const dados = await privadoService.listarPorAluno(alunoId);

    return dados.map(item => new Privado(item).toJSON());
};