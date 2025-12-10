// notas/notaService.js

export default class NotaService {
  constructor({
    createNota,
    deleteNota,
    getNotaById,
    getNotasPorAluno,
    getNotasPorDisciplina,
    getNotasPorProfessor,
    getNotasPorTurma,
    updateNota,
    validarPermissaoProfessor
  }) {
    this.createNota = createNota;
    this.deleteNota = deleteNota;
    this.getNotaById = getNotaById;
    this.getNotasPorAluno = getNotasPorAluno;
    this.getNotasPorDisciplina = getNotasPorDisciplina;
    this.getNotasPorProfessor = getNotasPorProfessor;
    this.getNotasPorTurma = getNotasPorTurma;
    this.updateNota = updateNota;
    this.validarPermissaoProfessor = validarPermissaoProfessor;
  }

  async criar(data) {
    return await this.createNota(data);
  }

  async remover(id) {
    return await this.deleteNota(id);
  }

  async buscarPorId(id) {
    return await this.getNotaById(id);
  }

  async listarPorAluno(aluno_id) {
    return await this.getNotasPorAluno(aluno_id);
  }

  async listarPorDisciplina(disciplina_id) {
    return await this.getNotasPorDisciplina(disciplina_id);
  }

  async listarPorProfessor(professor_id) {
    return await this.getNotasPorProfessor(professor_id);
  }

  async listarPorTurma(turma_id) {
    return await this.getNotasPorTurma(turma_id);
  }

  async atualizar(id, data) {
    return await this.updateNota(id, data);
  }

  async validarPermissao(professor_id, turma_id) {
    return await this.validarPermissaoProfessor(professor_id, turma_id);
  }
}
