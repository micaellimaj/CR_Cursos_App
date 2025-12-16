class Aluno {
  constructor({ id, full_name, email, senha, resetPasswordToken, resetPasswordExpires }) {
    this.id = id;
    this.nome = full_name;
    this.email = email;
    this.senha = senha;

    this.tipo = "aluno";
    this.collection = "alunos"; // 🔥 ESSENCIAL

    this.resetPasswordToken = resetPasswordToken || null;
    this.resetPasswordExpires = resetPasswordExpires || null;
  }
}

module.exports = Aluno;
