const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { gerarToken, verificarSenha } = require('../utils/authUtils');

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_teste';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_SENHA = process.env.ADMIN_SENHA;

const loginUsuario = async (email, senha) => {
  // Aluno
  const alunosSnap = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  const alunos = alunosSnap.val();
  if (alunos) {
    const id = Object.keys(alunos)[0];
    const aluno = alunos[id];

    if (!await verificarSenha(senha, aluno.senha)) {
      return { status: 401, data: 'Senha incorreta' };
    }

    const token = gerarToken({ id, tipo: 'aluno' });
    return { status: 200, data: { token, tipo: 'aluno', id, nome: aluno.full_name } };
  }

  // Professor
  const profSnap = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
  const profs = profSnap.val();
  if (profs) {
    const id = Object.keys(profs)[0];
    const prof = profs[id];

    if (!await verificarSenha(senha, prof.senha)) {
      return { status: 401, data: 'Senha incorreta' };
    }

    const token = gerarToken({ id, tipo: 'professor' });
    return { status: 200, data: { token, tipo: 'professor', id, nome: prof.full_name } };
  }

  // Admin
  if (email === ADMIN_EMAIL) {
    const adminSnap = await db.ref('administradores').orderByChild('email').equalTo(email).once('value');
    const admins = adminSnap.val();

    if (admins) {
      const id = Object.keys(admins)[0];
      const admin = admins[id];

      if (!await verificarSenha(senha, admin.senha)) {
        return { status: 401, data: 'Senha incorreta' };
      }

      const token = gerarToken({ id, tipo: 'admin' });
      return { status: 200, data: { token, tipo: 'admin', id, nome: admin.full_name } };
    }

    // Criação automática
    const hashSenha = await bcrypt.hash(ADMIN_SENHA, 10);
    const novoAdminRef = db.ref('administradores').push();
    const novoAdmin = {
      full_name: 'Administrador Principal',
      email: ADMIN_EMAIL,
      senha: hashSenha,
    };
    await novoAdminRef.set(novoAdmin);

    const token = gerarToken({ id: novoAdminRef.key, tipo: 'admin' });
    return {
      status: 201,
      data: { token, tipo: 'admin', id: novoAdminRef.key, nome: novoAdmin.full_name },
    };
  }

  // Nenhum usuário encontrado
  return { status: 404, data: 'Usuário não encontrado' };
};

module.exports = { loginUsuario };
