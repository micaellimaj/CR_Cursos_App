class Privado {
  constructor({
    id,
    professor_id,
    aluno_id,
    turma_id,
    mensagem,
    arquivos,
    visualizado,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.professor_id = professor_id;
    this.aluno_id = aluno_id;
    this.turma_id = turma_id;
    
    this.mensagem = mensagem || "";
    this.arquivos = arquivos || [];
    
    this.visualizado = visualizado || false;
    
    this.collection = "mensagens_privadas";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Privado;