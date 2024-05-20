class CreateCargos < ActiveRecord::Migration[7.1]
  def change
    create_table :cargos do |t|
      t.string :nome

      t.timestamps
    end
  end
end
