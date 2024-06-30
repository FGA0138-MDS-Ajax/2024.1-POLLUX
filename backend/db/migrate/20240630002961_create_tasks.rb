class CreateTasks < ActiveRecord::Migration[7.1]
    def change
      create_table :tasks do |t|
        t.string :title, null: false
        t.string :assignee, null: false
        t.string :status, null: false
        t.integer :position, null: false
  
        t.timestamps
      end
      add_index :tasks, :status
      add_index :tasks, :position
    end
  end