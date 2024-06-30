class CreateAcessos < ActiveRecord::Migration[7.1]
  def change
    create_table :acessos do |t|
      t.boolean :acesso_documents
      t.boolean :acesso_meetings
      t.boolean :acesso_calendar
      t.boolean :acesso_finance
      t.boolean :acesso_admin
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
