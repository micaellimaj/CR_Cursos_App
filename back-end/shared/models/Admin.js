class Admin {
  constructor({ id, full_name, email, senha, resetPasswordToken, resetPasswordExpires }) {
    this.id = id;
    this.nome = full_name;
    this.email = email;
    this.senha = senha;

    this.tipo = "admin";                  // uso lógico (JWT, permissões)
    this.collection = "administradores";  // 🔥 path REAL no Firebase

    this.resetPasswordToken = resetPasswordToken || null;
    this.resetPasswordExpires = resetPasswordExpires || null;
  }
}

module.exports = Admin;
