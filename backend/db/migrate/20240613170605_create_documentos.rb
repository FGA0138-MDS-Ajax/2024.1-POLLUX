class CreateDocumentos < ActiveRecord::Migration[7.1]
  def change
    create_table :documentos do |t|
      t.string :nome
      t.string :link
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
