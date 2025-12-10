const { db } = require("../../../shared/config/firebase");

module.exports.getNotaById = async (id) => {
  const snap = await db.ref(`notas/${id}`).once("value");
  if (!snap.exists()) return { success: false, message: "Nota não encontrada." };

  return { success: true, id, ...snap.val() };
};
