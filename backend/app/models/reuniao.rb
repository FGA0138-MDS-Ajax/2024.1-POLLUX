class Reuniao < ApplicationRecord
  has_many :reunioes_usuarios
  has_many :user, through: :reunioes_usuarios
end
