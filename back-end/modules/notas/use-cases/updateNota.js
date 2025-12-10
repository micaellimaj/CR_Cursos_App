const { db } = require("../../../shared/config/firebase");
const { validarPermissaoProfessor } = require("./validarPermissaoProfessor");

module.exports.updateNota = async (id, data) => {
  const notaSnap = await db.ref(`notas/${id}`).once("value");
  if (!notaSnap.exists()) return { success: false, message: "Nota não encontrada." };

  const atual = notaSnap.val();

  // validar permissão
  const perm = await validarPermissaoProfessor(
    atual.professorId,
    atual.turmaId,
    atual.disciplinaId,
    atual.alunoId
  );

  if (!perm.ok) return { success: false, message: perm.message };

  await db.ref(`notas/${id}`).update({
    ...data,
    updated_at: new Date().toISOString()
  });

  return { success: true };
};
