class Aluno {
  constructor({ id, full_name, email, senha }) {
    this.id = id;
    this.nome = full_name;
    this.email = email;
    this.senha = senha;
    this.tipo = "aluno";
  }
}

module.exports = Aluno;
