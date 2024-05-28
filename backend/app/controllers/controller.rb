require 'bcrypt'
def CriaUser(nome,matricula,email,senha,cargo)
  hash = BCrypt::Password.create(senha)
  User.create(nome: nome,matricula: matricula,email: email,senha: hash,cargo_id: cargo.id)
end
