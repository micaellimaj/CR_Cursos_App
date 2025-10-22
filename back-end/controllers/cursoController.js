const createCurso = require('../use-cases/curso/createCurso');
const getAllCursos = require('../use-cases/curso/getAllCursos');

const cursoController = {
    cadastrarCurso: async (req, res) => {
        try {
            const { nome, descricao } = req.body;

            const novoCurso = await createCurso({ nome, descricao });

            return res.status(201).json({
                mensagem: 'Curso cadastrado com sucesso!',
                curso: novoCurso
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('já está cadastrado')) {
                return res.status(400).json({ erro: error.message });
            }
            
            console.error('Erro ao cadastrar curso:', error);
            return res.status(500).json({ erro: 'Erro interno do servidor ao cadastrar curso.' });
        }
    },
    
    listarCursos: async (req, res) => {
        try {
            const cursos = await getAllCursos(); 
            
            return res.status(200).json(cursos);
        } catch (error) {
            console.error('Erro ao listar cursos:', error);
            return res.status(500).json({ erro: 'Erro interno do servidor ao listar cursos.' });
        }
    }
};

module.exports = cursoController;