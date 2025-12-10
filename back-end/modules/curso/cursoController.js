const createCursoUC = require('../curso/use-cases/createCurso');
const getAllCursosUC = require('../curso/use-cases/getAllCursos');
const getCursoByIdUC = require('../curso/use-cases/getCursoById');       
const updateCursoUC = require('../curso/use-cases/updateCurso');          
const deleteCursoUC = require('../curso/use-cases/deleteCurso');          
const getTurmasDoCursoUC = require('../curso/use-cases/getTurmasDoCurso');

const cursoController = {
    cadastrarCurso: async (req, res) => {
        try {
            const { nome, descricao } = req.body;
            const novoCurso = await createCursoUC({ nome, descricao });

            return res.status(201).json({
                mensagem: 'Curso cadastrado com sucesso!',
                curso: novoCurso
            });
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao cadastrar curso.' });
        }
    },

    listarCursos: async (req, res) => {
        try {
            const cursos = await getAllCursosUC();
            return res.status(200).json(cursos);
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao listar cursos.' });
        }
    },

    getCursoById: async (req, res) => {
        try {
            const curso = await getCursoByIdUC(req.params.id);
            return res.status(200).json(curso);
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao buscar curso.' });
        }
    },

    updateCurso: async (req, res) => {
        try {
            const resultado = await updateCursoUC(req.params.id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao atualizar curso.' });
        }
    },

    deleteCurso: async (req, res) => {
        try {
            const resultado = await deleteCursoUC(req.params.id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao deletar curso.' });
        }
    },

    getTurmasDoCurso: async (req, res) => {
        try {
            const turmas = await getTurmasDoCursoUC(req.params.id);
            return res.status(200).json(turmas);
        } catch (error) {
            return res.status(error.status || 500).json({ erro: error.message || 'Erro interno do servidor ao listar turmas do curso.' });
        }
    },
};

module.exports = cursoController;