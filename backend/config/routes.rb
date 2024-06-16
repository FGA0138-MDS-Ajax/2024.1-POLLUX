Rails.application.routes.draw do
  resources :acaos
  resources :storages
  resources :eventos
  resources :reuniaos
  resources :documentos
  post '/users/new', to: 'users#create'
  post '/users/login', to: 'users#login'
  post '/users/token', to: 'users#validaToken'
  post '/reuniaos', to: 'reuniaos#create'
  post '/documentos', to: 'documentos#create'
  post '/documentos/delete', to: 'documentos#destroy'
  post '/storages/delete', to: 'storages#destroy'
  post '/storages/edit', to: 'storages#update'
  post '/acaos/delete', to: 'acaos#destroy'
  post '/eventos/delete', to: 'eventos#destroy'

  resources :tarefas
  resources :cargos
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  patch 'users/password/:id', to: 'users#update_password'

  # Defines the root path route ("/")
  # root "posts#index"
end
