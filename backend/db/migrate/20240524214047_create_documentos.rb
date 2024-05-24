class CreateDocumentos < ActiveRecord::Migration[7.1]
  def change
    create_table :documentos do |t|
      t.string :titulo
      t.integer :nivelAcesso
      t.string :data
      t.string :tipoDocumento
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
