const { db } = require("../../../shared/config/firebase");

async function deleteDisciplina(id) {
  if (!id) {
    return { success: false, message: "ID da disciplina não informado." };
  }

  const disciplinaRef = db.ref(`disciplinas/${id}`);

  await disciplinaRef.remove();

  return {
    success: true,
    message: "Disciplina removida com sucesso!",
  };
}

module.exports = { deleteDisciplina };
