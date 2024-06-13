json.extract! documento, :id, :nome, :link, :user_id, :created_at, :updated_at
json.url documento_url(documento, format: :json)
