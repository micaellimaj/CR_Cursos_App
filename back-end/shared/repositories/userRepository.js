const db = require("../config/firebase").db;
const Aluno = require("../models/Aluno");
const Professor = require("../models/Professor");
const Admin = require("../models/Admin");

async function findUserByEmail(email) {
  const sources = [
    { path: "alunos", Model: Aluno },
    { path: "professores", Model: Professor },
    { path: "administradores", Model: Admin }
  ];

  for (const { path, Model } of sources) {
    const snap = await db.ref(path)
      .orderByChild("email")
      .equalTo(email)
      .once("value");

    if (snap.exists()) {
      const [id, data] = Object.entries(snap.val())[0];
      return new Model({ id, ...data });
    }
  }

  return null;
}

async function findUserByResetToken(token) {
  const sources = [
    { path: "alunos", Model: Aluno },
    { path: "professores", Model: Professor },
    { path: "administradores", Model: Admin }
  ];

  for (const { path, Model } of sources) {
    const snap = await db.ref(path)
      .orderByChild("resetPasswordToken")
      .equalTo(token)
      .once("value");

    if (snap.exists()) {
      const [id, data] = Object.entries(snap.val())[0];
      return new Model({ id, ...data });
    }
  }

  return null;
}

async function saveResetToken(user, token) {
  await db.ref(`${user.collection}/${user.id}`).update({
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 1000 * 60 * 30
  });
}

async function updatePassword(user, hashedPassword) {
  await db.ref(`${user.collection}/${user.id}`).update({
    senha: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
    updated_at: Date.now()
  });
}

module.exports = {
  findUserByEmail,
  findUserByResetToken,
  saveResetToken,
  updatePassword
};
