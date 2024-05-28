class CreateTarefas < ActiveRecord::Migration[7.1]
  def change
    create_table :tarefas do |t|
      t.string :titulo
      t.string :descricao
      t.string :data
      t.integer :prioridade
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
