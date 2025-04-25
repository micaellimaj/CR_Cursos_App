# Projeto_Javascripto

site template :https://uideck.com/templates/nextjs-tailwind-template

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
