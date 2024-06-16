# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

def find_or_create_user_with_access(user_data)
    hashed_password = BCrypt::Password.create(user_data[:senha])
    
    user = User.find_or_create_by!(nome: user_data[:nome], matricula: user_data[:matricula]) do |u|
      u.email = user_data[:email]
      u.senha = hashed_password
    end
  
    user.update(email: user_data[:email], senha: hashed_password) unless user.new_record?
    
    user.create_acesso(user_data[:acesso]) unless user.acesso.present?
    user.acesso.update(user_data[:acesso]) if user.acesso.present?
  
    user.save!
  end
  
  users = [
    {
      nome: 'admin',
      matricula: '000000000',
      email: 'teste@aluno.unb.br',
      senha: 'senha123',
      acesso: {
        acesso_documents: true,
        acesso_meetings: true,
        acesso_calendar: true,
        acesso_finance: true,
        acesso_admin: true
      }
    }
  ]
  users.each { |user_data| find_or_create_user_with_access(user_data) }
  
  puts "Seeded #{User.count} users and #{Acesso.count} access records."