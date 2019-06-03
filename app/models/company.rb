# == Schema Information
#
# Table name: companies
#
#  id          :bigint           not null, primary key
#  ticker      :string           not null
#  name        :string           not null
#  ceo         :string           not null
#  market_cap  :integer          not null
#  employees   :integer          not null
#  dividen     :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  about       :text             not null
#  founded     :integer          not null
#  headquarter :string           not null
#  pe_ratio    :float            not null
#  avg_volume  :integer          not null
#

class Company < ApplicationRecord
    validates :ticker, :name, :ceo, :market_cap, :about, :founded, :headquarter, :avg_volume, presence: true
    validates :ticker, :name, uniqueness: true

    
end
