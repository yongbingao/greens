class ChangeColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :companies, :market_cap, :float
  end
end
