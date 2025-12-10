const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./shared/swagger/swagger')
require('dotenv').config();
const imagemRoutes = require('./modules/imagem/imagemRoutes');
app.use('/api/imagem', imagemRoutes);
const alunoRoutes = require('./modules/aluno/alunoRoutes');
const professorRoutes = require('./modules/professor/professorRoutes');
const authRoutes = require('./modules/auth/authRoutes');
const uploadRoutes = require('./modules/upload/uploadRoutes');
const cursoRoutes = require('./modules/curso/cursoRoutes');
const turmaRoutes = require('./modules/turma/turmaRoutes');
const disciplinaRoutes = require('./modules/disciplina/disciplinaRoutes');
const notaRoutes = require('./modules/notas/notaRoutes');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API rodando com sucesso! 🚀');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes); 
app.use('/auth', authRoutes);                 
app.use('/uploads', express.static('uploads'));
app.use('/upload', uploadRoutes);
app.use('/curso', cursoRoutes);
app.use('/turma', turmaRoutes);
app.use('/disciplina', disciplinaRoutes);
app.use('/nota', notaRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
