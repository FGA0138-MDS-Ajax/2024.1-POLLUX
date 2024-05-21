json.extract! user, :id, :nome, :matricula, :email, :senha, :cargo_id, :created_at, :updated_at
json.url user_url(user, format: :json)
