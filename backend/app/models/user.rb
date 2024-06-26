class User < ApplicationRecord
    has_one :acesso, dependent: :destroy
    accepts_nested_attributes_for :acesso
    has_many :reuniaos
    has_many :reunioes_usuarios
    has_many :reunioes, through: :reunioes_usuarios
end
