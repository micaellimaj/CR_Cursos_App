const { db } = require("../../../shared/config/firebase");

// Gerador de ID como DIS-AB12CD
function gerarIdDisciplina() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `DIS-${random}`;
}

async function createDisciplina({ nome, cursoId, professorId }) {
  if (!nome || !cursoId || !professorId) {
    return { success: false, message: "Campos obrigatórios faltando." };
  }

  const id = gerarIdDisciplina();

  // Firebase Admin usa .ref()
  const disciplinaRef = db.ref(`disciplinas/${id}`);

  const data = {
    id,
    nome,
    cursoId,
    professorId,
    turmasAssociadas: [],
    createdAt: new Date().toISOString(),
  };

  await disciplinaRef.set(data);

  return {
    success: true,
    message: "Disciplina criada com sucesso!",
    data,
  };
}

module.exports = { createDisciplina };
