const { db } = require('../../shared/config/firebase'); 
const ENTIDADE = 'cursos';

/**
 * Verifica se um curso com o nome fornecido já existe no banco.
 */
async function findByNome(nome) {
    const snapshot = await db.ref(ENTIDADE)
                             .orderByChild('nome')
                             .equalTo(nome)
                             .once('value');
    
    if (snapshot.exists()) {
        const [key, data] = Object.entries(snapshot.val())[0];
        return { id: key, ...data };
    }
    return null;
}

/**
 * Cria um novo registro de curso usando o ID gerado pelo Use Case.
 */
async function create(id, dados) {
    await db.ref(`${ENTIDADE}/${id}`).set({
        ...dados,
        created_at: new Date().toISOString()
    });
    
    return id;
}

/**
 * Lista todos os cursos.
 */
async function findAll() {
    const snapshot = await db.ref(ENTIDADE).once('value');
    const cursos = snapshot.val() || {};
    return Object.entries(cursos).map(([id, data]) => ({ id, ...data }));
}

/**
 * Busca um curso pelo ID.
 */
async function findById(id) {
    const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
    if (!snapshot.exists()) return null;
    
    return { id, ...snapshot.val() };
}

/**
 * Atualiza os dados de um curso.
 */
async function update(id, novosDados) {
    const cursoRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await cursoRef.once('value');
    
    if (!snapshot.exists()) return false;

    await cursoRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Deleta um curso.
 */
async function remove(id) {
    const cursoRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await cursoRef.once('value');
    
    if (!snapshot.exists()) return false;
    
    await cursoRef.remove();
    return true;
}

module.exports = {
    findByNome,
    create,
    findAll,
    findById,      
    getCursoPorId: findById,
    update,
    remove
};