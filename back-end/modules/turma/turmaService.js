const { db } = require('../../shared/config/firebase'); 
const ENTIDADE = 'turmas';

/**
 * Cria um novo registro de turma usando o ID customizado.
 * @param {string} id
 * @param {object} dados
 */
async function criarTurma(id, dados) {
    const professoresIniciais = dados.professor_principal_id 
        ? { [dados.professor_principal_id]: true } 
        : {};

    await db.ref(`${ENTIDADE}/${id}`).set({
        ...dados,
        alunos: {}, 
        professores: professoresIniciais,
        created_at: new Date().toISOString()
    });
    
    return id;
}

/**
 * Busca uma turma pelo ID.
 */
async function getTurmaPorId(id) {
    const snapshot = await db.ref(`${ENTIDADE}/${id}`).once('value');
    if (!snapshot.exists()) return null;
    
    return { id, ...snapshot.val() };
}

/**
 * Lista todas as turmas.
 */
async function getTodasTurmas() {
    const snapshot = await db.ref(ENTIDADE).once('value');
    const turmas = snapshot.val() || {};
    
    return Object.entries(turmas).map(([id, data]) => ({ id, ...data }));
}

/**
 * Adiciona um aluno ao nó de alunos da turma.
 */
async function adicionarAluno(turmaId, alunoId) {
    await db.ref(`${ENTIDADE}/${turmaId}/alunos/${alunoId}`).set(true);
    return true;
}

/**
 * Adiciona um professor ao nó de professores da turma.
 */
async function adicionarProfessor(turmaId, professorId) {
    await db.ref(`${ENTIDADE}/${turmaId}/professores/${professorId}`).set(true);
    return true;
}

/**
 * Atualiza os dados de uma turma.
 */
async function atualizarTurma(id, novosDados) {
    const turmaRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await turmaRef.once('value');
    
    if (!snapshot.exists()) return false;

    await turmaRef.update({
        ...novosDados,
        updated_at: new Date().toISOString()
    });

    return true;
}

/**
 * Deleta uma turma pelo ID.
 */
async function deletarTurma(id) {
    const turmaRef = db.ref(`${ENTIDADE}/${id}`);
    const snapshot = await turmaRef.once('value');
    
    if (!snapshot.exists()) return false;
    
    await turmaRef.remove();
    return true;
}

/**
 * Lista turmas por Curso (útil para integridade de dados).
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
    getTurmaById: getTurmaPorId,
    getTodasTurmas,
    adicionarAluno,
    adicionarProfessor,
    atualizarTurma, 
    deletarTurma,
    getTurmasPorCursoId
};