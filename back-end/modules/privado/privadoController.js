const enviarConteudoUC = require('./use-cases/enviarConteudo');
const getConteudoByAlunoUC = require('./use-cases/getConteudoByAluno');
const updateConteudoUC = require('./use-cases/updateConteudo');
const deleteConteudoUC = require('./use-cases/deleteConteudo');
const privadoService = require('./privadoService');

const enviarConteudo = async (req, res) => {
    try {
        const { files } = req;
        const dados = req.body;
        const professorId = req.user.id;
        const arquivos = [];

        if (files && files.length > 0) {
            for (const file of files) {
                const path = `privado/anexos/${Date.now()}_${file.originalname}`;
                const url = await privadoService.uploadArquivo(file, path);
                
                arquivos.push({
                    nome: file.originalname,
                    url: url,
                    tipo: file.mimetype.split('/')[1]
                });
            }
        }

        if (dados.links) {
            const linksArray = Array.isArray(dados.links) ? dados.links : [dados.links];
            linksArray.forEach(link => {
                arquivos.push({ nome: 'Link Externo', url: link, tipo: 'link' });
            });
        }

        const result = await enviarConteudoUC({ ...dados, arquivos }, professorId);

        res.status(201).json({ 
            mensagem: 'Conteúdo privado enviado com sucesso!',
            privado: result
        });
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro interno do servidor ao enviar conteúdo' 
        });
    }
};

const getConteudoByAluno = async (req, res) => {
    try {
        const { alunoId } = req.params;
        const conteudos = await getConteudoByAlunoUC(alunoId);
        res.status(200).json(conteudos);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao buscar conteúdos do aluno' 
        });
    }
};

const updateConteudo = async (req, res) => {
    try {
        const { mensagemId, alunoId } = req.params;
        const professorId = req.user.id;
        const result = await updateConteudoUC(mensagemId, alunoId, professorId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao atualizar conteúdo' 
        });
    }
};

const deleteConteudo = async (req, res) => {
    try {
        const { mensagemId, alunoId } = req.params;
        const professorId = req.user.id;
        const result = await deleteConteudoUC(mensagemId, alunoId, professorId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ 
            message: error.message || 'Erro ao deletar conteúdo' 
        });
    }
};

module.exports = {
    enviarConteudo,
    getConteudoByAluno,
    updateConteudo,
    deleteConteudo
};