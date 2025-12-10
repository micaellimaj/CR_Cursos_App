const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Minha API - CR Cursos Mobile',
    version: '1.0.0',
    description: 'Documentação da API do projeto AppCR',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Insira o token JWT no formato `Bearer <token>`',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [
    // Todas as rotas de todos os módulos
    path.join(__dirname, '../../modules/**/*.js'),

    // Caso você ainda tenha middlewares com documentação
    path.join(__dirname, '../../middlewares/**/*.js'),

    // Configs adicionais caso existam
    path.join(__dirname, '../../shared/**/*.js'),
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
