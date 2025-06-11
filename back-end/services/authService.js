// ===================================
// authService.js (ARQUIVO CORRIGIDO)
// ===================================

const { db } = require('../config/firebase'); // Assumindo que db é seu objeto Firebase Admin
const bcrypt = require('bcryptjs'); // Para hashing de senhas
const jwt = require('jsonwebtoken'); // Para JWT
const { gerarToken, verificarSenha } = require('../utils/authUtils'); // Supondo que verificarSenha é o bcrypt.compare encapsulado

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_padrao_muito_segura'; // Use uma chave forte no .env!
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_SENHA = process.env.ADMIN_SENHA; // Senha clara do admin padrão, para a primeira vez

const loginUsuario = async (email, senha) => {
    try {
        let user = null;
        let userType = null;
        let userId = null;
        let userName = null;
        let userHashedPassword = null;

        // Tenta encontrar como Aluno
        const alunosSnap = await db.ref('alunos').orderByChild('email').equalTo(email).once('value');
        const alunos = alunosSnap.val();
        if (alunos) {
            userId = Object.keys(alunos)[0];
            user = alunos[userId];
            userType = 'aluno';
            userName = user.full_name;
            userHashedPassword = user.senha;
        }

        // Se não for aluno, tenta encontrar como Professor
        if (!user) {
            const profSnap = await db.ref('professores').orderByChild('email').equalTo(email).once('value');
            const profs = profSnap.val();
            if (profs) {
                userId = Object.keys(profs)[0];
                user = profs[userId];
                userType = 'professor';
                userName = prof.full_name;
                userHashedPassword = prof.senha;
            }
        }

        // Se não for aluno nem professor, tenta encontrar como Admin no banco de dados (se houver)
        // Isso é para admins que foram criados e suas senhas hasheadas
        if (!user) {
            const adminDbSnap = await db.ref('administradores').orderByChild('email').equalTo(email).once('value');
            const adminsDb = adminDbSnap.val();
            if (adminsDb) {
                userId = Object.keys(adminsDb)[0];
                user = adminsDb[userId];
                userType = 'admin';
                userName = user.full_name;
                userHashedPassword = user.senha;
            }
        }

        // Se ainda não encontrou no DB, verifica se é o ADMIN_EMAIL padrão do .env
        if (!user && email === ADMIN_EMAIL) {
            // Primeiro, verifica se o admin padrão já foi criado no DB
            const adminRef = db.ref('administradores').orderByChild('email').equalTo(ADMIN_EMAIL);
            const existingAdminSnap = await adminRef.once('value');
            const existingAdmin = existingAdminSnap.val();

            if (existingAdmin) {
                // Admin já existe no DB, usa suas credenciais do DB
                userId = Object.keys(existingAdmin)[0];
                user = existingAdmin[userId];
                userType = 'admin';
                userName = user.full_name;
                userHashedPassword = user.senha;
            } else {
                // Admin padrão não existe no DB, cria-o agora
                const hashAdminSenha = await bcrypt.hash(ADMIN_SENHA, 10);
                const novoAdminRef = db.ref('administradores').push();
                const novoAdmin = {
                    full_name: 'Administrador Principal',
                    email: ADMIN_EMAIL,
                    senha: hashAdminSenha,
                };
                await novoAdminRef.set(novoAdmin);

                userId = novoAdminRef.key;
                user = novoAdmin;
                userType = 'admin';
                userName = novoAdmin.full_name;
                userHashedPassword = novoAdmin.senha; // A senha hasheada que acabou de ser criada
                
                // Se o admin foi criado agora, a senha a ser comparada é a que veio do .env
                // E a que foi passada na requisição.
                if (senha !== ADMIN_SENHA) {
                    return { status: 401, data: 'Senha incorreta para o administrador padrão' };
                }
                
                // Se chegou aqui, é o admin padrão e acabou de ser criado e a senha é a do .env
                const token = gerarToken({ id: userId, tipo: userType });
                return {
                    status: 201, // 201 Created para a primeira vez que o admin loga e é criado
                    data: { token, tipo: userType, id: userId, nome: userName }
                };
            }
        }

        // Se nenhum usuário foi encontrado ou o email do admin não corresponde ao .env
        if (!user) {
            return { status: 404, data: 'Usuário não encontrado ou credenciais inválidas' };
        }

        // Agora, verifica a senha para usuários existentes (alunos, professores, e admins do DB)
        // Usa a senha hasheada do usuário do banco de dados
        if (!await verificarSenha(senha, userHashedPassword)) {
            return { status: 401, data: 'Senha incorreta' };
        }

        // Gera o token para usuários existentes (alunos, professores, e admins do DB)
        const token = gerarToken({ id: userId, tipo: userType });
        return { status: 200, data: { token, tipo: userType, id: userId, nome: userName } };

    } catch (error) {
        console.error('Erro no loginUsuario service:', error);
        return { status: 500, data: 'Erro interno do servidor' };
    }
};

module.exports = { loginUsuario };