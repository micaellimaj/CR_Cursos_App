const turmaService = require('../turmaService');

const getAllTurmas = async () => {
    const turmas = await turmaService.getTodasTurmas();
    return turmas;
};

module.exports = getAllTurmas;