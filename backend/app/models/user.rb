class User < ApplicationRecord
  belongs_to :cargo
  has_many :estoques
  has_many :eventos
  has_many :documentos
  has_many :reunioes_usuarios
  has_many :reuniaos, through: :reunioes_usuarios
end
