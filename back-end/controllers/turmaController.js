const createTurmaUC = require('../use-cases/turma/createTurma');
const matricularAlunoUC = require('../use-cases/turma/matricularAluno');
const associarProfessorUC = require('../use-cases/turma/associarProfessor');
const getAlunosDaTurmaUC = require('../use-cases/turma/getAlunosDaTurma');
const getAllTurmasUC = require('../use-cases/turma/getAllTurmas'); 
const getTurmaByIdUC = require('../use-cases/turma/getTurmaById'); 
const updateTurmaUC = require('../use-cases/turma/updateTurma');
const deleteTurmaUC = require('../use-cases/turma/deleteTurma');

const createTurma = async (req, res) => {
    try {
        const result = await createTurmaUC(req.body); 
        res.status(201).json({ 
            mensagem: 'Turma criada com sucesso!',
            turma: result
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor ao criar turma' });
    }
};

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await getAllTurmasUC();
        res.status(200).json(turmas);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar turmas' });
    }
};

const getTurmaById = async (req, res) => {
    try {
        const turma = await getTurmaByIdUC(req.params.id);
        res.status(200).json(turma);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro ao buscar turma' });
    }
};

const updateTurma = async (req, res) => {
    try {
        const result = await updateTurmaUC(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar turma' });
    }
};

const deleteTurma = async (req, res) => {
    try {
        const result = await deleteTurmaUC(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar turma' });
    }
};


const matricularAluno = async (req, res) => {
    try {
        const turmaId = req.params.turmaId;
        const { alunoId } = req.body;
        const result = await matricularAlunoUC({ alunoId, turmaId });

        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor ao matricular aluno.' });
    }
};

const associarProfessor = async (req, res) => {
    try {
        const turmaId = req.params.turmaId;
        const { professorId } = req.body;

        const result = await associarProfessorUC({ professorId, turmaId });

        res.status(200).json(result); 
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor ao associar professor.' });
    }
};

const getAlunosDaTurma = async (req, res) => {
    try {
        const turmaId = req.params.turmaId;

        const alunos = await getAlunosDaTurmaUC(turmaId);

        res.status(200).json(alunos);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor ao buscar alunos da turma.' });
    }
};


module.exports = {
    createTurma,
    getAllTurmas,
    getTurmaById,
    updateTurma,
    deleteTurma,
    matricularAluno,
    associarProfessor,
    getAlunosDaTurma,
};