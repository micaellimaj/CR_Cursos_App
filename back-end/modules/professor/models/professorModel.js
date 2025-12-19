class Professor {
  constructor({ 
    id, full_name, email, senha, telefone, data_nascimento, 
    idade, turma_id_principal, created_at, updated_at 
  }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone || null;
    this.data_nascimento = data_nascimento;
    this.idade = idade;
    this.turma_id_principal = turma_id_principal || null;
    
    this.tipo = "professor";
    this.collection = "professores";

    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Professor;