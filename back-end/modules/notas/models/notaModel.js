class Nota {
  constructor({ id, alunoId, disciplinaId, professorId, turmaId, valor, nota, descricao, created_at }) {
    this.id = id;
    this.alunoId = alunoId;
    this.disciplinaId = disciplinaId;
    this.professorId = professorId;
    this.turmaId = turmaId;
    
    // Tenta pegar de 'valor' ou de 'nota' (para manter compatibilidade)
    this.valor = valor !== undefined ? valor : nota;
    
    this.descricao = descricao || "";
    this.collection = "notas";
    this.created_at = created_at || null;
  }

  toJSON() {
    // Removemos campos que não devem ir para o banco (como a definição da collection)
    const { collection, ...dados } = this;
    return dados;
  }
}

module.exports = Nota;