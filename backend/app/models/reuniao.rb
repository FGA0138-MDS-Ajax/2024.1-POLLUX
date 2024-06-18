class Reuniao < ApplicationRecord
  belongs_to :user
  has_many :reunioes_links
  has_many :reunioes_usuarios
  validates :user, presence: true
end
