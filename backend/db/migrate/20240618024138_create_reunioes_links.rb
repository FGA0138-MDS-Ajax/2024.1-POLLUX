class CreateReunioesLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :reunioes_links do |t|
      t.references :reuniao, null: false, foreign_key: true
      t.string :link
      t.string :descricao
      
      t.timestamps
    end
  end
end
