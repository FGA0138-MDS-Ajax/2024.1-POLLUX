json.extract! user, :id, :matricula, :nome, :email, :created_at, :updated_at
json.url user_url(user, format: :json)
