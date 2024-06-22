class Reuniao < ApplicationRecord
  belongs_to :user
  has_many :reunioes_links, dependent: :destroy
  has_many :reunioes_usuarios, dependent: :destroy
  accepts_nested_attributes_for :reunioes_links
  accepts_nested_attributes_for :reunioes_usuarios
  validates :user, presence: true
end
