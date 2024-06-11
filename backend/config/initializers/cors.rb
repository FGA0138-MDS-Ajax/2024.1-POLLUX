# config/initializers/cors.rb
#Configuração de CORS para permitir ips específicos para requisições ao back

Rails.application.config.middleware.insert_before 0, Rack::Cors do # => a Opção origin * habilita todos os ips
    allow do
      origins '*'
      resource '*', headers: :any, methods: [:get, :post, :patch, :put]
    end
  end