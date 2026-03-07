class Admin {
  constructor({ id, full_name, email, senha, resetPasswordToken, resetPasswordExpires }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.senha = senha;

    this.tipo = "admin";
    this.collection = "administradores";

    this.resetPasswordToken = resetPasswordToken || null;
    this.resetPasswordExpires = resetPasswordExpires || null;
  }

  toJSON() {
    return {
      full_name: this.full_name,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo,
      resetPasswordToken: this.resetPasswordToken,
      resetPasswordExpires: this.resetPasswordExpires
    };
  }
}

module.exports = Admin;