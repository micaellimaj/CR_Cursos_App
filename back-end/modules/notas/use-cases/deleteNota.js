const { db } = require("../../../shared/config/firebase");

module.exports.deleteNota = async (id) => {
  const snap = await db.ref(`notas/${id}`).once("value");
  if (!snap.exists()) return { success: false, message: "Nota não encontrada." };

  await db.ref(`notas/${id}`).remove();

  return { success: true };
};
