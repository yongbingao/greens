# == Schema Information
#
# Table name: transactions
#
#  id              :bigint           not null, primary key
#  user_id         :integer          not null
#  company_id      :integer          not null
#  purchase_price  :float            not null
#  purchase_shares :integer          not null
#  average_price   :float            not null
#  net_shares      :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Transaction < ApplicationRecord
    validates :purchase_price, :purchase_shares, :average_price, :net_shares, presence: true
    validates :purchase_price, numericality: { greater_than: 0 }
    validates :net_shares, :average_price, numericality: { greater_than_or_equal_to: 0 }

    belongs_to :user
    belongs_to :company
end
