class CreateDocumentos < ActiveRecord::Migration[7.1]
  def change
    create_table :documentos do |t|
      t.string :nome
      t.string :link

      t.timestamps
    end
  end
end
