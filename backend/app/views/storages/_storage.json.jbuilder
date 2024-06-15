json.extract! storage, :id, :nome, :quantidade, :status, :user_id, :created_at, :updated_at
json.url storage_url(storage, format: :json)
