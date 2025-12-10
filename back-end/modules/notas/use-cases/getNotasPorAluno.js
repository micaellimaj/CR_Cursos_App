const { db } = require("../../../shared/config/firebase");

module.exports.getNotasPorAluno = async (alunoId) => {
  const snap = await db.ref("notas")
    .orderByChild("alunoId")
    .equalTo(alunoId)
    .once("value");

  const data = snap.val() || {};

  return Object.entries(data).map(([id, v]) => ({ id, ...v }));
};
