const cursoService = require('../cursoService');
const turmaService = require('../../turma/turmaService');

module.exports = async (id) => {
    if (!id) {
        throw { status: 400, message: 'O ID do Curso é obrigatório para a exclusão.' };
    }

    const cursoExistente = await cursoService.findById(id);
    if (!cursoExistente) {
        throw { status: 404, message: `Curso com ID ${id} não encontrado.` };
    }

    const turmasVinculadas = await turmaService.getTurmasPorCursoId(id);
    
    if (turmasVinculadas && turmasVinculadas.length > 0) {
        throw { 
            status: 400, 
            message: `Não é possível deletar o curso. Existem ${turmasVinculadas.length} turma(s) vinculadas a ele.` 
        };
    }

    const sucesso = await cursoService.remove(id);

    if (!sucesso) {
        throw { status: 500, message: 'Falha interna ao deletar o curso.' };
    }

    return { message: 'Curso excluído com sucesso.' };
};