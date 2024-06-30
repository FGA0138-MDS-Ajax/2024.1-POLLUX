class CreateEventos < ActiveRecord::Migration[7.1]
  def change
    create_table :eventos do |t|
      t.string :nome
      t.string :data
      t.string :HoraInicio
      t.string :HoraTermino

      t.timestamps
    end
  end
end
