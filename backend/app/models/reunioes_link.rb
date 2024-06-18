class ReunioesLink < ApplicationRecord
    belongs_to :reuniao
    validates :reuniao, presence: true
end
