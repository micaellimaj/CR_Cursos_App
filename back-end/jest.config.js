module.exports = {
  // Indica que o ambiente de teste é o Node.js
  testEnvironment: 'node',

  // Limpa mocks automaticamente entre cada teste
  clearMocks: true,

  // Padrão de pastas/arquivos que o Jest deve procurar
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ],

  // Ignorar pastas específicas
  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // (Opcional) Cobertura de código - mostra o que falta testar
  collectCoverage: true,
  collectCoverageFrom: [
    "modules/**/*.js",
    "!modules/**/utils/*.js"
  ],
  coverageDirectory: "coverage",
};