const { db } = require('../../shared/config/firebase'); 
const ENTIDADE = 'cursos';


/**
 * Verifica se um curso com o nome fornecido já existe no banco.
 * @param {string} nome 
 * @returns {object|null}
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
 * Cria um novo registro de curso.
 * @param {object} dados
 * @returns {string}
 */
async function create(dados) {
    const novoCursoRef = db.ref(ENTIDADE).push();
    const novoId = novoCursoRef.key;
    
    await novoCursoRef.set({
        ...dados,
        created_at: new Date().toISOString()
    });
    
    return novoId;
}

/**
 * Lista todos os cursos.
 * @returns {Array<object>}
 */
async function findAll() {
    const snapshot = await db.ref(ENTIDADE).once('value');
    const cursos = snapshot.val() || {};
    return Object.entries(cursos).map(([id, data]) => ({ id, ...data }));
}

/**
 * Busca um curso pelo ID (key).
 * @param {string} id 
 * @returns {object|null}
 */
async function findById(id) {
    const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
    if (!snapshot.exists()) return null;
    
    return { id, ...snapshot.val() };
}

/**
 * Atualiza os dados de um curso.
 * @param {string} id
 * @param {object} novosDados
 * @returns {boolean}
 */
async function update(id, novosDados) {
    const cursoRef = db.ref(`${ENTIDADE}/${id}`);
    const dadosExistentesSnap = await cursoRef.once('value');
    
    if (!dadosExistentesSnap.exists()) return false;

    await cursoRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Deleta um curso pelo ID.
 * @param {string} id
 * @returns {boolean}
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
    update,
    remove
};