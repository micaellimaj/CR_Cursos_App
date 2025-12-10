const { db } = require("../../../shared/config/firebase");
const firebaseAdmin = require("firebase-admin");
const { validarPermissaoProfessor } = require("./validarPermissaoProfessor");

module.exports.createNota = async (data) => {
  const {
    alunoId,
    disciplinaId,
    professorId,
    turmaId,
    nota,
    descricao = null
  } = data;

  // validação de permissão
  const perm = await validarPermissaoProfessor(professorId, turmaId, disciplinaId, alunoId);
  if (!perm.ok) return { success: false, message: perm.message };

  const notaRef = db.ref("notas").push();
  const id = notaRef.key;

  await notaRef.set({
    alunoId,
    disciplinaId,
    professorId,
    turmaId,
    nota,
    descricao,
    created_at: firebaseAdmin.database.ServerValue.TIMESTAMP
  });

  return { success: true, id };
};
