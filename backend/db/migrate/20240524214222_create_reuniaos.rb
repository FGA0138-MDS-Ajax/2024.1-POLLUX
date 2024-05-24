class CreateReuniaos < ActiveRecord::Migration[7.1]
  def change
    create_table :reuniaos do |t|
      t.string :titulo
      t.string :ata
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
