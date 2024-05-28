class CreateAcaos < ActiveRecord::Migration[7.1]
  def change
    create_table :acaos do |t|
      t.string :titulo
      t.float :valor
      t.boolean :type
      t.string :data
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
