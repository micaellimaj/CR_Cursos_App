const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./shared/swagger/swagger')
require('dotenv').config();
const alunoRoutes = require('./modules/aluno/alunoRoutes');
const professorRoutes = require('./modules/professor/professorRoutes');
const authRoutes = require('./modules/auth/authRoutes');
const cursoRoutes = require('./modules/curso/cursoRoutes');
const turmaRoutes = require('./modules/turma/turmaRoutes');
const disciplinaRoutes = require('./modules/disciplina/disciplinaRoutes');
const notaRoutes = require('./modules/notas/notaRoutes');
const frequenciaRoutes = require('./modules/frequencia/frequenciaRoutes');
const conteudoRoutes = require('./modules/conteudo/conteudoRoutes');
const atividadeRoutes = require('./modules/atividades/atividadeRoutes');
const classeRoutes = require('./modules/classe/classeRoutes');
const privadoRoutes = require('./modules/privado/privadoRoutes.js');
const path = require("path");
const hbs = require('hbs');

// Middleware para parsing de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configurar view engine para usar Handlebars
app.set('view engine', 'hbs');

// Configurar pasta de templates (em vez da pasta views padrão)
app.set('views', path.join(__dirname, 'templates'));

// Error handling middleware para JSON parsing
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'Use aspas duplas nas propriedades JSON',
      details: err.message
    });
  }
  next(err);
});

app.get('/', (req, res) => {
  res.send('API rodando com sucesso! 🚀');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes); 
app.use('/auth', authRoutes);                 
app.use('/uploads', express.static('uploads'));
app.use('/curso', cursoRoutes);
app.use('/turma', turmaRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/nota', notaRoutes);
app.use('/frequencia', frequenciaRoutes);
app.use('/conteudo', conteudoRoutes);
app.use('/atividade', atividadeRoutes);
app.use('/classe', classeRoutes);
app.use('/privado', privadoRoutes);
// arquivos estáticos
app.use("/js", express.static(path.join(__dirname, "public/js")));
// views
app.set("views", path.join(__dirname, "shared/views"));
app.set("view engine", "hbs");


const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
  });
}

module.exports = app;