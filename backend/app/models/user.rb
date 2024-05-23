class User < ApplicationRecord
  belongs_to :cargo
  has_many :estoques
end
