class Aluno {
    constructor({ first_name, last_name, email, username, password }) {
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.username = username;
      this.password = password;
      this.created_at = new Date();
    }
}
  
module.exports = Aluno;