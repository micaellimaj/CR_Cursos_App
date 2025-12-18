const { db } = require('../../shared/config/firebase');

async function emailExiste(email) {
  const snapshot = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
}

async function criarAluno(id, alunoInstance) {
  const dados = alunoInstance.toJSON ? alunoInstance.toJSON() : alunoInstance;
  
  await db.ref(`alunos/${id}`).set({
    ...dados,
    created_at: new Date().toISOString()
  });
  return id;
}

/**
 * Adiciona ou atualiza o turma_id de um aluno existente.
 * @param {string} alunoId
 * @param {string} turmaId
 * @returns {boolean}
 */
async function adicionarTurmaAoAluno(alunoId, turmaId) {
    const alunoRef = db.ref(`alunos/${alunoId}`);
    const snapshot = await alunoRef.once('value');

    if (!snapshot.exists()) {
        return false;
    }

    await alunoRef.update({
        turma_id: turmaId,
        updated_at: new Date().toISOString()
    });

    return true;
}

async function getTodosAlunos() {
  const snapshot = await db.ref('alunos').once('value');
  const alunos = snapshot.val() || {};
  return Object.entries(alunos).map(([id, data]) => ({ id, ...data }));
}

async function getAlunoPorId(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return null;
  return snapshot.val();
}

async function atualizarAluno(id, novosDados) {
  const alunoRef = db.ref(`alunos/${id}`);
  const snapshot = await alunoRef.once('value');
  if (!snapshot.exists()) return false;

  const dadosParaAtualizar = novosDados.toJSON ? novosDados.toJSON() : novosDados;

  await alunoRef.update({
    ...dadosParaAtualizar,
    updated_at: new Date().toISOString()
  });

  return true;
}

async function deletarAluno(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return false;
  await db.ref(`alunos/${id}`).remove();
  return true;
}

module.exports = {
  emailExiste,
  criarAluno,
  getTodosAlunos,
  getAlunoPorId,
  atualizarAluno,
  deletarAluno,
  adicionarTurmaAoAluno
};
