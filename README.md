# CR Cursos - App Mobile

## 📱 Introdução:
A plataforma CR Cursos está sendo desenvolvida em parceria com a escola profissionalizante CR Cursos, localizada na cidade de Toritama - PE, junto aos alunos da Unifavip Wyden, como parte das atividades da disciplina Programação para Dispositivos Móveis em Android, sob orientação do professor Wolney. O projeto é resultado da aplicação prática dos conhecimentos adquiridos em sala de aula, com o objetivo de gerar impacto real para a comunidade escolar.

## Objetivo:
A plataforma tem como obejetivo oferecer uma plataforma mobile para os alunos da instituição "CR Curso" para que possam acompanhar o curso em que estão matriculados e uma conexão entre os alunos ou professores, pois através da plataforma os professores podem enviar os conteudos de suas aulas para a plataforma e atividades para os alunos , e os alunos podem consumir o conteudo das aulas e fazer as atividades, e tanto os alunos como os professores tem sua area de usuario, com personalização de seu conteudo, autenticação de usuário e também a um terceiro user chamado ADM que fica responsável por gerenciar os demais usuários do sistema e também é o resposável por cadastrar o progessor na plataforma.

## Tecnologias:

## Funcionalidades:

A plataforma é dividida em três perfis de usuários:

1. Aluno:
* Acesso aos cursos em que está matriculado.
* Visualização e download de conteúdos das aulas.
* Realização e envio de atividades propostas pelos professores.
* Perfil personalizado.

2. Professor:
* Upload de conteúdos educacionais (aulas, PDFs, vídeos, etc).
* Cadastro e gerenciamento de atividades para os alunos.
* Perfil personalizado com controle sobre suas turmas.

3. Administrador (ADM):
* Gerenciamento completo da plataforma.
* Cadastro e controle de usuários (alunos e professores).
* Supervisão geral da organização dos cursos e turmas.

## Estrutura do Projeto:
```
CR_Cursos_App/
│
├── frontend/                     # Projeto Next.js com Tailwind CSS
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── .env.local
│   ├── next.config.js
│   └── package.json
│
├── backend/                      # Projeto Node.js com Express + Firebase
│   ├── config/                   # Inicializações e configs (ex: firebase.js)
│   │   └── firebase.js
│   │
│   ├── controllers/              # Lógica das rotas (ex: criar usuário)
│   │   └── userController.js
│   │
│   ├── routes/                   # Rotas da API
│   │   └── userRoutes.js
│   │
│   ├── models/                   # Modelos de dados (ex: User.js com Sequelize ou esquema lógico)
│   │   └── userModel.js
│   │
│   ├── middlewares/             # Verificação de autenticação, erros, logs etc.
│   │   └── authMiddleware.js
│   │
│   ├── services/                 # Serviços externos (ex: integração com Firebase Auth, Storage etc.)
│   │   └── firebaseService.js
│   │
│   ├── utils/                    # Funções auxiliares, helpers, validações etc.
│   │   └── formatDate.js
│   │
│   ├── .env                      # Variáveis de ambiente (ex: credenciais Firebase)
│   ├── server.js                 # Arquivo principal do servidor Express
│   └── package.json
│
├── .gitignore
└── README.md
```

## Conclusão:

Com esta plataforma, a CR Cursos de Toritama amplia suas possibilidades de ensino, alcançando alunos de maneira mais dinâmica, moderna e acessível. A iniciativa representa um avanço importante na digitalização do ensino profissionalizante na região do Agreste Pernambucano.
