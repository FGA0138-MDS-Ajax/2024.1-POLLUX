Rails.application.routes.draw do
  resources :reuniaos
  resources :eventos
  resources :storages
  resources :documentos
  resources :users
  resources :tasks do
    member do
      post 'delete', action: 'destroy'
      post 'edit', action: 'update'
    end
    collection do
      patch 'batch_update', action: 'batch_update'
    end
  end
  resources :acaos
  resources :reuniaos do
    post 'new_link', on: :member
    put 'update_link/:link_id', action: 'update_link'
    post 'delete_link/:link_id', action: 'delete_link'
    put 'edit_presence', on: :member
    post 'delete', action: 'destroy'
    put 'edit', action: 'update'
  end

  patch 'users/password/:id', to: 'users#update_password'
  post '/users/new', to: 'users#create'
  post '/users/login', to: 'users#login'
  post '/users/token', to: 'users#autenticar'
  post '/users/edit', to: 'users#edit'
  post '/users/delete/:id', to: 'users#destroy'
  post '/documentos', to: 'documentos#create'
  post '/documentos/delete', to: 'documentos#destroy'
  post '/storages/delete', to: 'storages#destroy'
  post '/storages/edit', to: 'storages#update'
  post '/acaos/delete', to: 'acaos#destroy'
  post '/eventos/delete', to: 'eventos#destroy'
  post '/storages/index', to: 'storages#getStorage'
  post 'password/forgot', to: 'passwords#forgot'
  post 'password/reset', to: 'passwords#reset'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
