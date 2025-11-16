const cursoService = require('../../services/cursoService');

const getAllCursos = async () => {
    
    const cursos = await cursoService.findAll();

    return cursos;
};

module.exports = getAllCursos;