class ChangeColumnCompanies < ActiveRecord::Migration[5.2]
  def change
    change_column :companies, :employees, :integer, :null => true
    change_column :companies, :pe_ratio, :float, :null => true
    change_column :companies, :dividen, :float, :null => true
  end
end
