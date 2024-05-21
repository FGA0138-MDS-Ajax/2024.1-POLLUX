class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nome
      t.string :matricula
      t.string :email
      t.string :senha
      t.references :cargo, null: false, foreign_key: true

      t.timestamps
    end
  end
end
