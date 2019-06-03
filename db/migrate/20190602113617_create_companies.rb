class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :ticker, null: false, unique: true
      t.string :name, null: false, unique: true
      t.string :ceo, null: false
      t.integer :market_cap, null: false
      t.integer :employees, null: false
      t.float :dividen, null: false
      t.timestamps
    end

    add_index :companies, :ticker
    add_index :companies, :name
  end
end
