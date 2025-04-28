const express = require('express');
const cors = require('cors');
const app = express();

// Rota de imagem //
const imagemRoutes = require('./routes/imagemRoutes');
app.use('/api/imagem', imagemRoutes);

// 🔹 Importando as rotas corretamente:
const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware para aceitar JSON e habilitar CORS
app.use(express.json());
app.use(cors());

// Rota base para teste
app.get('/', (req, res) => {
  res.send('API rodando com sucesso! 🚀');
});

// Rotas da API
app.use('/api', alunoRoutes);              // Alunos em: http://localhost:5000/api
app.use('/professores', professorRoutes);  // Professores em: http://localhost:5000/professores
app.use('/', authRoutes);                 // Login (alunos/professore) em: http://localhost:5000/login

// Inicializando servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});

