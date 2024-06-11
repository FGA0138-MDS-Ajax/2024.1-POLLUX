class CreateStorages < ActiveRecord::Migration[7.1]
  def change
    create_table :storages do |t|
      t.string :nome
      t.string :quantidade
      t.string :status
      t.references :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
