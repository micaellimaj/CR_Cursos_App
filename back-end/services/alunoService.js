const { db } = require('../config/firebase');
const bcrypt = require('bcryptjs');
const calcularIdade = require('../utils/aluno/calcularIdade');
const gerarIdPersonalizado = require('../utils/aluno/gerarIdPersonalizado');

async function emailExiste(email) {
  const snapshot = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
  return snapshot.exists();
}

async function criarAluno(dados) {
  console.log('Tentando criar aluno no service com dados:', dados);
  const hashedSenha = await bcrypt.hash(dados.senha, 10);
  const customId = gerarIdPersonalizado();

  // Calcula a idade. Se a data for inválida, calcularIdade retornará NaN.
  const idadeCalculada = calcularIdade(dados.data_nascimento);

  if (isNaN(idadeCalculada)) {
     console.error('ERRO NO SERVICE: Idade calculada é NaN para Firebase!');
      // Você pode lançar um erro, o que será capturado pelo catch do controller.
      // Ou, se a sua lógica permitir, definir um valor padrão.
      throw new Error('Data de nascimento inválida fornecida ao serviço.'); 
  }
  // É uma boa prática verificar NaN antes de tentar salvar,
  // mas o Firebase já valida isso (o que gerou seu erro).
  // Se você quisesse tratar isso antes de chegar ao Firebase,
  // faria uma validação aqui e lançaria um erro ou retornaria.
  // Por enquanto, vamos confiar na validação do Firebase e no controller.

  
  try {
    await db.ref(`alunos/${customId}`).set({
      ...dados,
      senha: hashedSenha,
      idade: idadeCalculada, // Passa a idade calculada, que pode ser NaN se a data for inválida
      // Ajuste de responsavel para menores de 18:
      nome_responsavel: idadeCalculada < 18 ? dados.nome_responsavel : null,
      email_responsavel: idadeCalculada < 18 ? dados.email_responsavel : null,
      telefone_responsavel: idadeCalculada < 18 ? dados.telefone_responsavel : null,
      created_at: firebase.database.ServerValue.TIMESTAMP // Melhor usar ServerValue.TIMESTAMP para evitar problemas de fuso horário
    });console.log('Aluno gravado no Firebase com sucesso! ID:', customId); // <--- LOG DE SUCESSO NO DB
    } catch (dbError) {
        console.error('ERRO AO GRAVAR NO FIREBASE:', dbError); // <--- LOG DO ERRO DO FIREBASE!
        throw dbError; // Re-lança para o controller capturar e enviar 500 ao frontend
    }

    return customId;
  }

async function getTodosAlunos() {
  const snapshot = await db.ref('alunos').once('value');
  const alunos = snapshot.val() || {};
  return Object.entries(alunos).map(([id, data]) => ({ id, ...data }));
}

async function getAlunoPorId(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return null;
  return snapshot.val();
}

async function atualizarAluno(id, novosDados) {
  const dadosExistentesSnap = await db.ref(`alunos/${id}`).once('value');
  if (!dadosExistentesSnap.exists()) return false;

  const idade = calcularIdade(novosDados.data_nascimento);
  const dadosAtualizados = {
    ...novosDados,
    idade,
    nome_responsavel: idade < 18 ? novosDados.nome_responsavel : null,
    email_responsavel: idade < 18 ? novosDados.email_responsavel : null,
    telefone_responsavel: idade < 18 ? novosDados.telefone_responsavel : null,
    updated_at: new Date().toISOString()
  };

  await db.ref(`alunos/${id}`).update(dadosAtualizados);
  return true;
}

async function deletarAluno(id) {
  const snapshot = await db.ref(`alunos/${id}`).once('value');
  if (!snapshot.exists()) return false;
  await db.ref(`alunos/${id}`).remove();
  return true;
}

module.exports = {
  emailExiste,
  criarAluno,
  getTodosAlunos,
  getAlunoPorId,
  atualizarAluno,
  deletarAluno
};