Rails.application.routes.draw do
  resources :storages
  post "/users/new", to: 'users#create'
  post '/users/login', to: 'users#login' 
  post '/users/token', to: 'users#validaToken'

  resources :reuniaos
  resources :documentos
  resources :tarefas
  resources :acaos
  resources :cargos
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  patch "users/password/:id", to: "users#update_password"

  # Defines the root path route ("/")
  # root "posts#index"
end
