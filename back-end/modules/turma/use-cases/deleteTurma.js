const turmaService = require('../turmaService');


const deleteTurma = async (id) => {
    if (!id) {
        throw { status: 400, message: 'O ID da Turma é obrigatório para a exclusão.' };
    }

    const turma = await turmaService.getTurmaPorId(id);
    if (!turma) {
        throw { status: 404, message: `Turma com ID ${id} não encontrada.` };
    }
    
    // !. [Ação de Negócio Importante] Limpeza de Referências: fazer + tarde
    
    const sucesso = await turmaService.deletarTurma(id);

    if (!sucesso) {
        throw { status: 500, message: 'Falha ao deletar a turma no banco de dados.' };
    }

    return { message: 'Turma excluída com sucesso.' };
};

module.exports = deleteTurma;