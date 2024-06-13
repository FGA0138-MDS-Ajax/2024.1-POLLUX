json.extract! reuniao, :id, :nome, :link, :user_id, :created_at, :updated_at
json.url reuniao_url(reuniao, format: :json)
