class Classe {
  constructor({ 
    id, turma_id, professor_id, titulo, descricao, 
    tipo, anexos, created_at, updated_at 
  }) {
    this.id = id;
    this.turma_id = turma_id;
    this.professor_id = professor_id;
    this.titulo = titulo;
    this.descricao = descricao || "";
    
    this.tipo = tipo || "material"; 

    this.anexos = anexos || []; 
    
    this.collection = "classes";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Classe;