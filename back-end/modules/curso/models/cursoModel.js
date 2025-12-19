class Curso {
  constructor({ id, nome, descricao, created_at, updated_at }) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao || "";
    this.collection = "cursos";
    
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Curso;