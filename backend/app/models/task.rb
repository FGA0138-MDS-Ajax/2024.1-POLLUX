class Task < ApplicationRecord
    validates :title, presence: true
    validates :assignee, presence: true
    validates :status, inclusion: { in: ['Pendente', 'Em andamento', 'Finalizado'] }
    validates :position, presence: true, numericality: { only_integer: true }
  end
