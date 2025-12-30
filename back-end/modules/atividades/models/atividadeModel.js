class Atividade {
  constructor({ 
    id, 
    titulo, 
    descricao, 
    disciplinaId, 
    tipo, 
    conteudoTexto, 
    urlArquivo, 
    dataEntrega, 
    created_at, 
    updated_at 
  }) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao || "";
    this.disciplinaId = disciplinaId;
    this.tipo = tipo;
    this.conteudoTexto = conteudoTexto || null;
    this.urlArquivo = urlArquivo || null;
    this.dataEntrega = dataEntrega || null;
    
    this.collection = "atividades";
    this.created_at = created_at || null;
    this.updated_at = updated_at || null;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = Atividade;