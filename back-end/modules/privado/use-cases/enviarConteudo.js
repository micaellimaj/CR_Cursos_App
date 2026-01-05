const Privado = require('../models/privadoModel');
const { validarDadosPrivado } = require('../types/privadoSchema');
const privadoService = require('../privadoService');
const turmaService = require('../../turma/turmaService');
const gerarIdPrivado = require('../utils/gerarIdPrivado');

module.exports = async (dados, professorId) => {
    validarDadosPrivado(dados);

    const { aluno_id, turma_id, mensagem, arquivos } = dados;

    const turma = await turmaService.getTurmaById(turma_id);
    if (!turma) {
        throw { status: 404, message: 'Turma não encontrada.' };
    }

    const professorNaTurma = turma.professores && turma.professores[professorId];
    if (!professorNaTurma) {
        throw { status: 403, message: 'Acesso negado: Você não é professor desta turma.' };
    }

    const alunoNaTurma = turma.alunos && turma.alunos[aluno_id];
    if (!alunoNaTurma) {
        throw { status: 400, message: 'Este aluno não está matriculado na turma selecionada.' };
    }

    const customId = gerarIdPrivado();
    const novoConteudo = new Privado({
        id: customId,
        professor_id: professorId,
        aluno_id,
        turma_id,
        mensagem,
        arquivos,
        created_at: new Date().toISOString()
    });

    await privadoService.salvarMensagem(novoConteudo.toJSON());

    return {
        id: novoConteudo.id,
        message: 'Conteúdo enviado ao aluno com sucesso.'
    };
};