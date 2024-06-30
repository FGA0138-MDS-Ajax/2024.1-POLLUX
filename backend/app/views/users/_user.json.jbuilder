json.extract! user, :id, :nome, :matricula, :email, :senha, :token, :created_at, :updated_at
json.url user_url(user, format: :json)
