const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_teste';

// Função de login
const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  try {
    // 1. Tenta encontrar o usuário em alunos
    const alunosSnap = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
    const alunos = alunosSnap.val();

    if (alunos) {
      const id = Object.keys(alunos)[0];
      const aluno = alunos[id];

      const senhaCorreta = await bcrypt.compare(senha, aluno.senha);
      if (!senhaCorreta) return res.status(401).send('Senha incorreta');

      const token = jwt.sign({ id, tipo: 'aluno' }, SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).send({ token, tipo: 'aluno', id, nome: aluno.full_name });
    }

    // 2. Tenta encontrar o usuário em professores
    const profSnap = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
    const profs = profSnap.val();

    if (profs) {
      const id = Object.keys(profs)[0];
      const prof = profs[id];

      const senhaCorreta = await bcrypt.compare(senha, prof.senha);
      if (!senhaCorreta) return res.status(401).send('Senha incorreta');

      const token = jwt.sign({ id, tipo: 'professor' }, SECRET_KEY, { expiresIn: '1h' });

      return res.status(200).send({ token, tipo: 'professor', id, nome: prof.full_name });
    }

    // Se não encontrar em nenhum
    return res.status(404).send('Usuário não encontrado');
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).send('Erro interno');
  }
};

module.exports = { login };
