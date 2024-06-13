class CreateEventos < ActiveRecord::Migration[7.1]
  def change
    create_table :eventos do |t|
      t.string :nome
      t.string :data
      t.string :HoraInicio
      t.string :HoraTermino
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
