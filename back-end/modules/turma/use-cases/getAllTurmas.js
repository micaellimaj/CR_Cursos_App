const Turma = require('../models/turmaModel');
const turmaService = require('../turmaService');

module.exports = async () => {
    const turmas = await turmaService.getTodasTurmas();
    return turmas.map(t => new Turma(t).toJSON());
};