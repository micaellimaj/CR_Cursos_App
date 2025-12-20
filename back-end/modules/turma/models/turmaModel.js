class Turma {
  constructor({ 
    id, nome, curso_id, data_inicio, data_fim, 
    professor_principal_id, professores, created_at, updated_at 
  }) {
    this.id = id;
    this.nome = nome;
    this.curso_id = curso_id;
    this.data_inicio = data_inicio;
    this.data_fim = data_fim;
    
    this.professor_principal_id = professor_principal_id || null;
    this.professores = professores || {};
    
    this.collection = "turmas";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Turma;