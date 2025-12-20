class Disciplina {
  constructor({ id, nome, cursoId, professorId, turmasAssociadas, created_at, updated_at }) {
    this.id = id;
    this.nome = nome;
    this.cursoId = cursoId;
    this.professorId = professorId;
    this.turmasAssociadas = turmasAssociadas || [];
    
    this.collection = "disciplinas";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Disciplina;