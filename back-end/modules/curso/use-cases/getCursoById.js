const cursoService = require('../../services/cursoService');

const getCursoById = async (id) => {
    if (!id) {
        throw { status: 400, message: 'O ID do Curso é obrigatório.' };
    }

    const curso = await cursoService.findById(id); 

    if (!curso) {
        throw { status: 404, message: `Curso com ID ${id} não encontrado.` };
    }

    return curso;
};

module.exports = getCursoById;