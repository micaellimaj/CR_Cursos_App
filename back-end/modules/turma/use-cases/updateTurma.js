const Turma = require('../models/turmaModel');
const turmaService = require('../turmaService');
const cursoService = require('../../curso/cursoService');

module.exports = async (id, novosDados) => {
    if (!id) throw { status: 400, message: 'ID obrigatório.' };

    const turmaExistente = await turmaService.getTurmaPorId(id);
    if (!turmaExistente) throw { status: 404, message: 'Turma não encontrada.' };
    
    if (novosDados.curso_id) {
        const cursoExiste = await cursoService.findById(novosDados.curso_id);
        if (!cursoExiste) throw { status: 404, message: 'Novo curso não encontrado.' };
    }
    
    const inicio = new Date(novosDados.data_inicio || turmaExistente.data_inicio);
    const fim = new Date(novosDados.data_fim || turmaExistente.data_fim);
    if (inicio >= fim) {
        throw { status: 400, message: 'A data de início deve ser anterior à data de fim.' };
    }

    const turmaParaUpdate = new Turma({ ...novosDados });
    delete turmaParaUpdate.id;

    const sucesso = await turmaService.atualizarTurma(id, turmaParaUpdate.toJSON());

    if (!sucesso) throw { status: 500, message: 'Erro ao atualizar no banco.' };

    return { message: 'Turma atualizada com sucesso.' };
};