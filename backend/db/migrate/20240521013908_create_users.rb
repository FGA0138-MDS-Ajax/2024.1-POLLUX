class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :nome
      t.string :matricula
      t.string :email
      t.string :senha

      t.timestamps
    end
  end
end
