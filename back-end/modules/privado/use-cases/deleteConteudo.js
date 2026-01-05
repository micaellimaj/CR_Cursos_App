const Privado = require('../models/privadoModel');
const privadoService = require('../privadoService');

module.exports = async (mensagemId, alunoId, professorId) => {
    const mensagemExistente = await privadoService.getById(alunoId, mensagemId);

    if (!mensagemExistente) {
        throw { status: 404, message: 'Conteúdo não encontrado.' };
    }

    if (mensagemExistente.professor_id !== professorId) {
        throw { status: 403, message: 'Você não tem permissão para excluir este conteúdo.' };
    }

    await privadoService.removerMensagem(alunoId, mensagemId);

    return { message: 'Conteúdo removido com sucesso.' };
};