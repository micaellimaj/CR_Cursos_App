const { db, bucket } = require('../../shared/config/firebase');
const ENTIDADE = 'mensagens_privadas';

/**
 * Salva uma nova mensagem/conteúdo privado.
 * @param {object} dados
 */
async function salvarMensagem(dados) {
    const { id, aluno_id } = dados;
    await db.ref(`${ENTIDADE}/${aluno_id}/${id}`).set({
        ...dados,
        created_at: new Date().toISOString()
    });
    return id;
}

/**
 * Busca uma mensagem específica de um aluno.
 */
async function getById(alunoId, mensagemId) {
    const snapshot = await db.ref(`${ENTIDADE}/${alunoId}/${mensagemId}`).once('value');
    if (!snapshot.exists()) return null;

    return { id: mensagemId, ...snapshot.val() };
}

/**
 * Lista todas as mensagens enviadas para um aluno específico.
 */
async function listarPorAluno(alunoId) {
    const snapshot = await db.ref(`${ENTIDADE}/${alunoId}`).once('value');
    const mensagens = snapshot.val() || {};

    return Object.entries(mensagens).map(([id, data]) => ({ id, ...data }));
}

/**
 * Atualiza o conteúdo de uma mensagem privada.
 */
async function atualizarMensagem(alunoId, mensagemId, novosDados) {
    const msgRef = db.ref(`${ENTIDADE}/${alunoId}/${mensagemId}`);
    const snapshot = await msgRef.once('value');

    if (!snapshot.exists()) return false;

    await msgRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Remove uma mensagem privada.
 */
async function removerMensagem(alunoId, mensagemId) {
    const msgRef = db.ref(`${ENTIDADE}/${alunoId}/${mensagemId}`);
    const snapshot = await msgRef.once('value');

    if (!snapshot.exists()) return false;

    await msgRef.remove();
    return true;
}

/**
 * Marca uma mensagem como visualizada pelo aluno.
 */
async function marcarComoVisualizada(alunoId, mensagemId) {
    await db.ref(`${ENTIDADE}/${alunoId}/${mensagemId}`).update({
        visualizado: true,
        updated_at: new Date().toISOString()
    });
    return true;
}

/**
 * Faz upload de arquivo para o Firebase Storage
 */
async function uploadArquivo(file, path) {
    const fileUpload = bucket.file(path);
    await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype }
    });
    await fileUpload.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

module.exports = {
    salvarMensagem,
    getById,
    listarPorAluno,
    atualizarMensagem,
    removerMensagem,
    marcarComoVisualizada,
    uploadArquivo
};