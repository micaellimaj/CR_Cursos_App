require('dotenv').config();
const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

// Inicializa o app
const app = express();

// Middleware para aceitar JSON e habilitar CORS
app.use(express.json());
app.use(cors());

// Rotas da API
app.get('/', (req, res) => {
  res.send('API rodando com sucesso! 🚀');
});


app.use('/api', alunoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});