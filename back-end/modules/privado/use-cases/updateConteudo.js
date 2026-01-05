const Privado = require('../models/privadoModel');
const { validarDadosPrivado } = require('../types/privadoSchema');
const privadoService = require('../privadoService');

module.exports = async (mensagemId, alunoId, professorId, novosDados) => {

    const mensagemExistente = await privadoService.getById(alunoId, mensagemId);

    if (!mensagemExistente) {
        throw { status: 404, message: 'Conteúdo não encontrado para edição.' };
    }

    if (mensagemExistente.professor_id !== professorId) {
        throw { status: 403, message: 'Você não tem permissão para editar este conteúdo.' };
    }

    validarDadosPrivado({ ...mensagemExistente, ...novosDados, aluno_id: alunoId });

    const conteudoAtualizado = new Privado({
        ...mensagemExistente,
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    await privadoService.atualizarMensagem(alunoId, mensagemId, conteudoAtualizado.toJSON());

    return {
        id: mensagemId,
        message: 'Conteúdo atualizado com sucesso.'
    };
};