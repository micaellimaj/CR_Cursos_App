const createClasseUC = require('./use-cases/createClasse');
const getAllClassesByTurmaUC = require('./use-cases/getAllClassesByTurma');
const getClasseByIdUC = require('./use-cases/getClasseById');
const updateClasseUC = require('./use-cases/updateClasse');
const deleteClasseUC = require('./use-cases/deleteClasse');
const classeService = require('./classeService');

const createClasse = async (req, res) => {
    try {
        const { files } = req;
        const dados = req.body;
        const anexos = [];

        if (files && files.length > 0) {
            for (const file of files) {
                const path = `classes/anexos/${Date.now()}_${file.originalname}`;
                const url = await classeService.uploadArquivo(file, path);
                
                anexos.push({
                    nome: file.originalname,
                    url: url,
                    tipo: file.mimetype.split('/')[1]
                });
            }
        }

        if (dados.links) {
            const linksArray = Array.isArray(dados.links) ? dados.links : [dados.links];
            linksArray.forEach(link => {
                anexos.push({ nome: 'Link Externo', url: link, tipo: 'link' });
            });
        }

        const result = await createClasseUC({ ...dados, anexos });

        res.status(201).json({ 
            mensagem: 'Conteúdo postado com sucesso!',
            classe: result
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro interno do servidor ao criar postagem' 
        });
    }
};

const getClassesByTurma = async (req, res) => {
    try {
        const { turma_id } = req.params;
        const classes = await getAllClassesByTurmaUC(turma_id);
        res.status(200).json(classes);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao buscar conteúdos da turma' 
        });
    }
};

const getClasseById = async (req, res) => {
    try {
        const classe = await getClasseByIdUC(req.params.id);
        res.status(200).json(classe);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao buscar conteúdo' 
        });
    }
};

const updateClasse = async (req, res) => {
    try {
        const result = await updateClasseUC(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao atualizar conteúdo' 
        });
    }
};

const deleteClasse = async (req, res) => {
    try {
        const result = await deleteClasseUC(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao deletar conteúdo' 
        });
    }
};

module.exports = {
    createClasse,
    getClassesByTurma,
    getClasseById,
    updateClasse,
    deleteClasse
};