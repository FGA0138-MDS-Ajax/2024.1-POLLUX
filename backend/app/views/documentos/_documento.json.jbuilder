json.extract! documento, :id, :nome, :link, :created_at, :updated_at
json.url documento_url(documento, format: :json)
