class CreateDogs < ActiveRecord::Migration
  def change
    create_table :dogs do |t|
      t.string :name
      t.integer :weight

      t.timestamps null: false
    end
  end
end
