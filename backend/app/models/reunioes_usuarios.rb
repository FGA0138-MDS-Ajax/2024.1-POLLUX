class ReunioesUsuarios < ApplicationRecord
    belongs_to :reuniao
    validates :reuniao, presence: true
end
