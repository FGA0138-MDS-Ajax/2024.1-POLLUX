class CreateEstoques < ActiveRecord::Migration[7.1]
  def change
    create_table :estoques do |t|

      t.timestamps
    end
  end
end
