const { db } = require("../../../shared/config/firebase");

async function updateDisciplina(id, data) {
  if (!id) {
    return { success: false, message: "ID da disciplina não informado." };
  }

  const disciplinaRef = db.ref(`disciplinas/${id}`);

  await disciplinaRef.update({
    ...data,
    updatedAt: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Disciplina atualizada com sucesso!",
  };
}

module.exports = { updateDisciplina };
