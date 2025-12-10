// notas/notaController.js

export default class NotaController {
  constructor({ notaService }) {
    this.notaService = notaService;
  }

  criar = async (req, res) => {
    try {
      const nova = await this.notaService.criar(req.body);
      return res.status(201).json(nova);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  atualizar = async (req, res) => {
    try {
      const resultado = await this.notaService.atualizar(req.params.id, req.body);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  deletar = async (req, res) => {
    try {
      await this.notaService.remover(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const nota = await this.notaService.buscarPorId(req.params.id);
      return res.status(200).json(nota);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

  listarPorAluno = async (req, res) => {
    try {
      const notas = await this.notaService.listarPorAluno(req.params.aluno_id);
      return res.status(200).json(notas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  listarPorDisciplina = async (req, res) => {
    try {
      const notas = await this.notaService.listarPorDisciplina(req.params.disciplina_id);
      return res.status(200).json(notas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  listarPorProfessor = async (req, res) => {
    try {
      const notas = await this.notaService.listarPorProfessor(req.params.professor_id);
      return res.status(200).json(notas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  listarPorTurma = async (req, res) => {
    try {
      const notas = await this.notaService.listarPorTurma(req.params.turma_id);
      return res.status(200).json(notas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
