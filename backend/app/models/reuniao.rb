class Reuniao < ApplicationRecord
  belongs_to :user
  has_many :reunioes_links
  has_many :reunioes_usuarios
  has_many :user, through: :reunioes_usuarios
end
