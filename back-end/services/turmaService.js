const { db } = require('../config/firebase'); 
const ENTIDADE = 'turmas';

/**
 * Cria um novo registro de turma.
 * @param {object} dados
 * @returns {string}
 */
async function criarTurma(dados) {
    const novaTurmaRef = db.ref(ENTIDADE).push();
    const novoId = novaTurmaRef.key;
    
    await novaTurmaRef.set({
        ...dados,
        alunos: {}, 
        professores: dados.professor_principal_id ? { [dados.professor_principal_id]: true } : {},
        created_at: new Date().toISOString()
    });
    
    return novoId;
}

/**
 * Busca uma turma pelo ID (key).
 * @param {string} id
 * @returns {object|null}
 */
async function getTurmaPorId(id) {
    const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
    if (!snapshot.exists()) return null;
    
    return { id, ...snapshot.val() };
}

/**
 * Lista todas as turmas.
 * @returns {Array<object>}
 */
async function getTodasTurmas() {
    const snapshot = await db.ref(ENTIDADE).once('value');
    const turmas = snapshot.val() || {};
    
    return Object.entries(turmas).map(([id, data]) => ({ id, ...data }));
}

/**
 * Adiciona um aluno a uma turma.
 * @param {string} turmaId
 * @param {string} alunoId
 * @returns {boolean}
 */
async function adicionarAluno(turmaId, alunoId) {
    await db.ref(`${ENTIDADE}/${turmaId}/alunos/${alunoId}`).set(true);
    return true;
}

/**
 * Adiciona um professor a uma turma.
 * @param {string} turmaId
 * @param {string} professorId
 * @returns {boolean}
 */
async function adicionarProfessor(turmaId, professorId) {
    await db.ref(`${ENTIDADE}/${turmaId}/professores/${professorId}`).set(true);
    return true;
}

/**
 * Atualiza os dados de uma turma.
 * @param {string} id
 * @param {object} novosDados
 * @returns {boolean}
 */
async function atualizarTurma(id, novosDados) {
    const turmaRef = db.ref(`${ENTIDADE}/${id}`);
    const dadosExistentesSnap = await turmaRef.once('value');
    
    if (!dadosExistentesSnap.exists()) return false;

    await turmaRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Deleta uma turma pelo ID.
 * @param {string} id
 * @returns {boolean}
 */
async function deletarTurma(id) {
    const turmaRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await turmaRef.once('value');
    
    if (!snapshot.exists()) return false;
    
    await turmaRef.remove();
    return true;
}

/**
 * Lista todas as turmas associadas a um curso específico.
 * @param {string} cursoId
 * @returns {Array<object>}
 */
async function getTurmasPorCursoId(cursoId) {
    const snapshot = await db.ref(ENTIDADE) 
                             .orderByChild('curso_id')
                             .equalTo(cursoId)
                             .once('value');
                             
    const turmas = snapshot.val() || {};
    
    return Object.entries(turmas).map(([id, data]) => ({ id, ...data }));
}

module.exports = {
    criarTurma,
    getTurmaPorId,
    getTodasTurmas,
    adicionarAluno,
    adicionarProfessor,
    atualizarTurma, 
    deletarTurma,
    getTurmasPorCursoId
};