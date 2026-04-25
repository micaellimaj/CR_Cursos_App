const Turma = require('../models/turmaModel');
const { db } = require('../../../shared/config/firebase');

module.exports = async (alunoId) => {
    if (!alunoId) throw { status: 400, message: 'O ID do Aluno é obrigatório.' };

    const snapshot = await db.ref('turmas')
        .orderByChild(`alunos/${alunoId}`)
        .equalTo(true)
        .once('value');

    const turmas = snapshot.val();

    if (!turmas) {
        return null;
    }

    const [id, dados] = Object.entries(turmas)[0];
    
    return new Turma({ id, ...dados }).toJSON();
};