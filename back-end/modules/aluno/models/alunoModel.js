class Aluno {
  constructor({ 
    id, full_name, email, senha, data_nascimento, idade, 
    turma_id, nome_responsavel, email_responsavel, 
    telefone_responsavel, telefone, created_at, updated_at
  }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.senha = senha;
    this.data_nascimento = data_nascimento;
    this.idade = idade;
    this.turma_id = turma_id;
    this.tipo = "aluno";
    
    const ehMenor = idade < 18;
    this.nome_responsavel = ehMenor ? nome_responsavel : null;
    this.email_responsavel = ehMenor ? email_responsavel : null;
    this.telefone_responsavel = ehMenor ? telefone_responsavel : null;
    this.telefone = telefone || null;

    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  // Método para converter a classe em objeto puro para o Firebase
  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Aluno;