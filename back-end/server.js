const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

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
app.use('/api/alunos', alunoRoutes);              // Alunos em: http://localhost:5000/api
app.use('/api/professores', professorRoutes);  // Professores em: http://localhost:5000/professores / 
app.use('/api', authRoutes);                 // Login (alunos/professore) em: http://localhost:5000/login

// Para servir os arquivos da pasta 'uploads'
app.use('/uploads', express.static('uploads'));

// Importa e usa as rotas de upload
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);



const PORT = process.env.PORT || 5000;
// ⛳️ Escutando em 0.0.0.0 permite que o Render acesse sua aplicação
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
