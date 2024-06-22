class ReunioesUsuario < ApplicationRecord
    belongs_to :reuniao
    belongs_to :user
    validates :reuniao, presence: true
end
