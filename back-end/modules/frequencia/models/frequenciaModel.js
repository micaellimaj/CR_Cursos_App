class Frequencia {
  constructor({ 
    id, 
    aluno_id, 
    turma_id, 
    disciplina_id, 
    professor_id, 
    data, 
    status, 
    observacao, 
    created_at, 
    updated_at 
  }) {
    this.id = id;
    this.aluno_id = aluno_id;
    this.turma_id = turma_id;
    this.disciplina_id = disciplina_id;
    this.professor_id = professor_id;
    this.data = data; 
    this.status = status !== undefined ? status : true; 
    
    this.observacao = observacao || null;
    
    this.collection = "frequencias";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Frequencia;