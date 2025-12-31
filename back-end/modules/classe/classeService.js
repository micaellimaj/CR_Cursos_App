const { db, bucket } = require('../../shared/config/firebase'); 
const ENTIDADE = 'classes';

/**
 * Cria uma nova postagem de classe.
 */
async function criarClasse(id, dados) {
    await db.ref(`${ENTIDADE}/${id}`).set({
        ...dados,
        created_at: new Date().toISOString()
    });
    
    return id;
}

/**
 * Busca uma postagem pelo ID.
 */
async function getClassePorId(id) {
    const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
    if (!snapshot.exists()) return null;
    
    return { id, ...snapshot.val() };
}

/**
 * Lista todas as postagens de uma turma específica.
 */
async function getClassesPorTurmaId(turmaId) {
    const snapshot = await db.ref(ENTIDADE)
                             .orderByChild('turma_id')
                             .equalTo(turmaId)
                             .once('value');
                               
    const classes = snapshot.val() || {};
    
    return Object.entries(classes).map(([id, data]) => ({ id, ...data }));
}

/**
 * Atualiza os dados de uma postagem.
 */
async function atualizarClasse(id, novosDados) {
    const classeRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await classeRef.once('value');
    
    if (!snapshot.exists()) return false;

    await classeRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Deleta uma postagem e limpa a referência.
 */
async function deletarClasse(id) {
    const classeRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await classeRef.once('value');
    
    if (!snapshot.exists()) return false;
    
    await classeRef.remove();
    return true;
}

/**
 * Helper para upload de arquivos no Firebase Storage.
 */
async function uploadArquivo(file, path) {
    const blob = bucket.file(path);
    const blobStream = blob.createWriteStream({
        metadata: { contentType: file.mimetype }
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', async () => {
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            resolve(publicUrl);
        });
        blobStream.end(file.buffer);
    });
}

module.exports = {
    criarClasse,
    getClassePorId,
    getClasseById: getClassePorId,
    getClassesPorTurmaId,
    getClassesByTurma: getClassesPorTurmaId,
    atualizarClasse,
    deletarClasse,
    uploadArquivo
};