class ReunioesUsuario < ApplicationRecord
    belongs_to :reuniao
    has_many :user
    validates :reuniao, presence: true
end
