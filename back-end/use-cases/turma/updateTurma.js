const turmaService = require('../../services/turmaService');
const cursoService = require('../../services/cursoService');

const updateTurma = async (id, novosDados) => {
    if (!id) {
        throw { status: 400, message: 'O ID da Turma é obrigatório para atualização.' };
    }

    const turmaExistente = await turmaService.getTurmaPorId(id);
    if (!turmaExistente) {
        throw { status: 404, message: `Turma com ID ${id} não encontrada.` };
    }
    
    if (novosDados.curso_id) {
        const cursoExiste = await cursoService.getCursoPorId(novosDados.curso_id);
        if (!cursoExiste) {
            throw { status: 404, message: `Curso com ID ${novosDados.curso_id} não encontrado.` };
        }
    }
    
    if (novosDados.data_inicio || novosDados.data_fim) {
        const inicio = new Date(novosDados.data_inicio || turmaExistente.data_inicio);
        const fim = new Date(novosDados.data_fim || turmaExistente.data_fim);

        if (inicio >= fim) {
            throw { status: 400, message: 'A data de início deve ser anterior à data de fim.' };
        }
    }


    const sucesso = await turmaService.atualizarTurma(id, novosDados);

    if (!sucesso) {
        throw { status: 500, message: 'Falha ao atualizar a turma no banco de dados.' };
    }

    return { message: 'Turma atualizada com sucesso.' };
};

module.exports = updateTurma;