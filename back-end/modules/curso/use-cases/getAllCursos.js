const cursoService = require('../cursoService');

const getAllCursos = async () => {
    
    const cursos = await cursoService.findAll();

    return cursos;
};

module.exports = getAllCursos;