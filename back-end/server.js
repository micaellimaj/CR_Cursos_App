const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger')
require('dotenv').config();

const imagemRoutes = require('./routes/imagemRoutes');
app.use('/api/imagem', imagemRoutes);

const alunoRoutes = require('./routes/alunoRoutes');
const professorRoutes = require('./routes/professorRoutes');
const authRoutes = require('./routes/authRoutes');

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

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/upload', uploadRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
