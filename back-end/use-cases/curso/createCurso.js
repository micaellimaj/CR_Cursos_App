const cursoService = require('../../services/cursoService');

const createCurso = async ({ nome, descricao }) => {

    if (!nome) {
        const error = new Error('O nome do curso é obrigatório.');
        error.status = 400; 
        throw error;
    }

    const cursoExistente = await cursoService.findByNome(nome);
    
    if (cursoExistente) {
        const error = new Error(`Já existe um curso com o nome "${nome}".`);
        error.status = 400;
        throw error;
    }

    const id = await cursoService.create({ nome, descricao });

    return { id, nome, descricao };
};

module.exports = createCurso;