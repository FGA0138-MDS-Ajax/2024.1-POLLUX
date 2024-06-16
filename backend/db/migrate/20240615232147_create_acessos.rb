class CreateAcessos < ActiveRecord::Migration[7.1]
  def change
    create_table :acessos do |t|
      t.references :user, null: false, foreign_key: true
      t.boolean :acesso_documents, default: false
      t.boolean :acesso_meetings, default: false
      t.boolean :acesso_calendar, default: false
      t.boolean :acesso_finance, default: false
      t.boolean :acesso_admin, default: false

      t.timestamps
    end
  end
end
