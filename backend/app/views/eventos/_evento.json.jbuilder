json.extract! evento, :id, :nome, :data, :HoraInicio, :HoraTermino, :created_at, :updated_at
json.url evento_url(evento, format: :json)
