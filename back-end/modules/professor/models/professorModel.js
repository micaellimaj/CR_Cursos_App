class Professor {
  constructor({ id, full_name, email, senha, resetPasswordToken, resetPasswordExpires }) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.senha = senha;

    this.tipo = "professor";                 
    this.collection = "professores";  // 🔥 path REAL no Firebase

    this.resetPasswordToken = resetPasswordToken || null;
    this.resetPasswordExpires = resetPasswordExpires || null;
  }
}

module.exports = Professor;
