class AddColumnCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :about, :text, null: false
    add_column :companies, :founded, :integer, null: false
    add_column :companies, :headquarter, :string, null: false
    add_column :companies, :pe_ratio, :float, null: false
    add_column :companies, :avg_volume, :integer, null: false
  end
end
