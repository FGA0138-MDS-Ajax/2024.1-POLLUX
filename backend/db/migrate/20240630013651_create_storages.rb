class CreateStorages < ActiveRecord::Migration[7.1]
  def change
    create_table :storages do |t|
      t.string :nome
      t.integer :quantidade
      t.string :status

      t.timestamps
    end
  end
end
