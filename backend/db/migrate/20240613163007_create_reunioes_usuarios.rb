class CreateReunioesUsuarios < ActiveRecord::Migration[7.1]
  def change
    create_table :reunioes_usuarios do |t|
      t.references :reuniao, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
