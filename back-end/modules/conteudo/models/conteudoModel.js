class Conteudo {
  constructor({
    id,
    disciplinaId,
    titulo,
    descricao = "",
    tipo,
    valor = null,
    url = null,
    mimeType = null,
    fileName = null,
    created_at = new Date().toISOString(),
    updated_at = new Date().toISOString()
  }) {
    this.id = id;
    this.disciplinaId = disciplinaId;
    this.titulo = titulo;
    this.descricao = descricao;
    this.tipo = tipo;
    this.valor = valor;
    this.url = url;
    this.mimeType = mimeType;
    this.fileName = fileName;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      disciplinaId: this.disciplinaId,
      titulo: this.titulo,
      descricao: this.descricao,
      tipo: this.tipo,
      valor: this.valor,
      url: this.url,
      mimeType: this.mimeType,
      fileName: this.fileName,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = Conteudo;