const turmaService = require('../../services/turmaService');
const cursoService = require('../../services/cursoService');
const professorService = require('../../services/professorService'); 

const createTurma = async (dados) => {
    const { curso_id, nome, data_inicio, data_fim, professor_principal_id } = dados;

    if (!curso_id || !nome || !data_inicio || !data_fim) {
        const error = new Error('Os campos curso_id, nome, data_inicio e data_fim são obrigatórios.');
        error.status = 400;
        throw error;
    }

    const cursoExistente = await cursoService.findById(curso_id);
    if (!cursoExistente) {
        const error = new Error(`Curso com ID ${curso_id} não encontrado.`);
        error.status = 404;
        throw error;
    }
    
    const inicio = new Date(data_inicio);
    const fim = new Date(data_fim);
    
    if (inicio >= fim) {
        const error = new Error('A data de início deve ser anterior à data de fim da turma.');
        error.status = 400;
        throw error;
    }

    const id = await turmaService.criarTurma(dados);

    return { id, ...dados, curso: cursoExistente.nome };
};

module.exports = createTurma;