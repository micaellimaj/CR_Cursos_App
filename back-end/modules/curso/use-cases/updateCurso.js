const cursoService = require('../../services/cursoService');

const updateCurso = async (id, dados) => {
    if (!id) {
        throw { status: 400, message: 'O ID do Curso é obrigatório para atualização.' };
    }
    if (Object.keys(dados).length === 0) {
        throw { status: 400, message: 'Nenhum dado de atualização fornecido.' };
    }

    const cursoExistente = await cursoService.findById(id);
    if (!cursoExistente) {
        throw { status: 404, message: `Curso com ID ${id} não encontrado.` };
    }

    if (dados.nome && dados.nome !== cursoExistente.nome) {
        const cursoComNovoNome = await cursoService.findByNome(dados.nome);
        if (cursoComNovoNome) {
            throw { status: 400, message: `O nome "${dados.nome}" já está sendo usado por outro curso.` };
        }
    }

    const sucesso = await cursoService.update(id, dados);

    if (!sucesso) {
        throw { status: 500, message: 'Falha interna ao atualizar o curso.' }; 
    }

    return { message: 'Curso atualizado com sucesso.' };
};

module.exports = updateCurso;