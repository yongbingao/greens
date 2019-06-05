class AddColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :current_buying_power, :integer, null: false
  end
end
