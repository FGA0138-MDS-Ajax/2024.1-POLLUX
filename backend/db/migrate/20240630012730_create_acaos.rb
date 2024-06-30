class CreateAcaos < ActiveRecord::Migration[7.1]
  def change
    create_table :acaos do |t|
      t.string :titulo
      t.float :valor
      t.boolean :tipo
      t.string :mes
      t.string :ano

      t.timestamps
    end
  end
end
