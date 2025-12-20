const Nota = require('../models/notaModel');
const notaService = require('../notaService');
const validarPermissao = require('./validarPermissaoProfessor');

module.exports = async (id, novosDados) => {
    if (!id) throw { status: 400, message: "ID da nota é obrigatório." };

    const notaAtual = await notaService.findById(id);
    if (!notaAtual) throw { status: 404, message: "Nota não encontrada." };

    await validarPermissao(
        notaAtual.professorId,
        notaAtual.turmaId,
        notaAtual.disciplinaId,
        notaAtual.alunoId
    );

    const dadosParaUpdate = {
        valor: novosDados.nota !== undefined ? novosDados.nota : notaAtual.valor,
        descricao: novosDados.descricao || notaAtual.descricao
    };

    const sucesso = await notaService.update(id, dadosParaUpdate);
    if (!sucesso) throw { status: 500, message: "Falha ao atualizar a nota." };

    return { message: "Nota atualizada com sucesso!" };
};