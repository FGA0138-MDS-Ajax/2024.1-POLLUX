class CreateUserJoinTableCargos < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :cargos, foreign_key: true
  end
end
