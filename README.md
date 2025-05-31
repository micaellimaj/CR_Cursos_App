# CR Cursos - App Mobile

## 📱 Introdução:
A plataforma CR Cursos está sendo desenvolvida em parceria com a escola profissionalizante CR Cursos, localizada na cidade de Toritama - PE, junto aos alunos da Unifavip Wyden, como parte das atividades da disciplina Programação para Dispositivos Móveis em Android, sob orientação do professor Wolney. O projeto é resultado da aplicação prática dos conhecimentos adquiridos em sala de aula, com o objetivo de gerar impacto real para a comunidade escolar.

## Objetivo:
A plataforma tem como obejetivo oferecer uma plataforma mobile para os alunos da instituição "CR Curso" para que possam acompanhar o curso em que estão matriculados e uma conexão entre os alunos ou professores, pois através da plataforma os professores podem enviar os conteudos de suas aulas para a plataforma e atividades para os alunos , e os alunos podem consumir o conteudo das aulas e fazer as atividades, e tanto os alunos como os professores tem sua area de usuario, com personalização de seu conteudo, autenticação de usuário e também a um terceiro user chamado ADM que fica responsável por gerenciar os demais usuários do sistema e também é o resposável por cadastrar o progessor na plataforma.

## Tecnologias:

<div align="center" style="display: inline_block">
  <img align="center" alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img align="center" alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img align="center" alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img align="center" alt="Express.js" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img align="center" alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img align="center" alt="Render" src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
  <img align="center" alt="Expo" src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img align="center" alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>


## Funcionalidades:

A plataforma é dividida em três perfis de usuários:

1. **Aluno**:
* Acesso aos cursos em que está matriculado.
* Visualização e download de conteúdos das aulas.
* Realização e envio de atividades propostas pelos professores.
* Perfil personalizado.

2. **Professor**:
* Upload de conteúdos educacionais (aulas, PDFs, vídeos, etc).
* Cadastro e gerenciamento de atividades para os alunos.
* Perfil personalizado com controle sobre suas turmas.

3. **Administrador (ADM)**:
* Gerenciamento completo da plataforma.
* Cadastro e controle de usuários (alunos e professores).
* Supervisão geral da organização dos cursos e turmas.

## Etapas do Projeto:

### Front-End:

### Back-End:
* Projeto modularizado com separação clara de responsabilidades: controllers/, routes/, services/, middlewares/, utils/, e config/.
* Utiliza Node.js com o framework Express.js para construção da API REST.
* Arquivo principal do servidor: server.js, responsável por configurar middlewares, rotas e iniciar o servidor.

1. **Estrutura Técnica**:
* controllers/: Lógica de controle das requisições HTTP, separada por domínio:
  * alunoController.js, professorController.js, authController.js, etc.
* routes/: Define as rotas da API agrupadas por entidade (aluno, professor, auth, upload, imagem).
* services/: Camada de regra de negócio, responsável por interações com Firebase e manipulações lógicas dos dados.
* middlewares/: Middleware de autenticação JWT (authMiddleware.js) para proteger rotas sensíveis.
* utils/:
  * Funções auxiliares para cálculo de idade, geração de senhas e validação de e-mails (calcularIdade.js, gerarIdPersonalizado.js, validarEmail.js).
* uploads/:
  * Pasta para gerenciamento e armazenamento temporário de arquivos enviados.

2. **Autenticação e Segurança**:
* Autenticação via JWT (JSON Web Token), implementada em authService.js e verificada por middleware.
* Separação entre usuários do tipo aluno, professor e administrador.
* Validações customizadas e geração de identificadores únicos para usuários.

### Banco de dados:

1. **Firebase Realtime Database**
* Utilizado como banco NoSQL em tempo real para persistência dos dados dos alunos, professores e administradores.
* Configuração feita em config/firebase.js com a chave de serviço firebaseServiceAccountKey.json.
* Interação com o Firebase feita exclusivamente pela camada de services/, promovendo separação e reuso de código.

2. **Docker (Docker Desktop)**
* Utilizado principalmente para o gerenciamento de upload de arquivos.
* Composição feita via docker-compose.yml para orquestração de containers.
* Imagem definida no Dockerfile, permitindo que o back-end seja facilmente containerizado e replicável.
* Arquivos são enviados através do uploadController.js, processados por uploadService.js e armazenados localmente em uploads/.

## Estrutura do Projeto:
```
CR_Cursos_App/
│
├── app/                          # Projeto React Native (frontend mobile)
│   ├── components/              # Componentes reutilizáveis da interface
│   ├── constants/               # Constantes globais (ex: cores, strings fixas)
│   ├── navigation/              # Lógica de navegação entre telas (React Navigation)
│   ├── screens/                 # Telas da aplicação
│   │   ├── styles/              # Estilos específicos das telas
│   │   ├── testes/              # Testes das telas (unitários ou de integração)
│   ├── styles/                  # Estilos globais
│   ├── assets/                  # Imagens, fontes, ícones e outros recursos visuais
│   ├── App.js                   # Arquivo principal da aplicação
│   ├── App.test.js              # Teste principal
│   ├── firebaseConfig.js        # Configuração do Firebase
│   ├── index.js                 # Entrada principal da aplicação
│   ├── package.json             # Dependências e scripts do projeto
│   ├── babel.config.js          # Configurações do Babel
│   ├── metro.config.js          # Configurações do Metro Bundler
│   └── tsconfig.json            # Configurações do TypeScript (se aplicável)
│
├── backend/                     # Backend Node.js com Express + Firebase Admin
│   ├── firebase/                # Chave de serviço Firebase e configs
│   │   └── firebaseServiceAccountKey.json
│   │
│   ├── controllers/             # Lógica das rotas (ex: criar aluno, enviar arquivos)
│   │   ├── alunoController.js
│   │   ├── imagemController.js
│   │   ├── professorController.js
│   │   └── uploadController.js
│   │
│   ├── routes/                  # Rotas da API Express
│   │   ├── alunoRoutes.js
│   │   ├── imagemRoutes.js
│   │   ├── professorRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── middlewares/            # Verificações, autenticação, validações
│   │   └── authMiddleware.js
│   │
│   ├── services/                # Serviços auxiliares (ex: upload, user service)
│   │   ├── alunoService.js
│   │   ├── professorService.js
│   │   ├── uploadService.js
│   │   └── utils.js             # Funções utilitárias diversas
│   │
│   ├── uploads/                 # Diretório onde os arquivos enviados são armazenados
│   │   ├── aluno/               # Uploads dos alunos
│   │   ├── professor/           # Uploads dos professores
│   │   ├── utils/               # Scripts auxiliares de upload
│   │   └── uploadUtil.js        # Lógica de manipulação de uploads
│   │
│   ├── server.js                # Inicialização do servidor Express
│   ├── .env                     # Variáveis de ambiente (credenciais, configs)
│   ├── package.json             # Dependências e scripts do backend
│   ├── Dockerfile               # Imagem Docker do backend
│   └── docker-compose.yml       # Orquestração de contêineres (se aplicável)
│
├── .gitignore                   # Arquivos e pastas ignorados pelo Git
├── README.md                    # Documentação geral do projeto

```

## Conclusão:

Com esta plataforma, a CR Cursos de Toritama amplia suas possibilidades de ensino, alcançando alunos de maneira mais dinâmica, moderna e acessível. A iniciativa representa um avanço importante na digitalização do ensino profissionalizante na região do Agreste Pernambucano.
