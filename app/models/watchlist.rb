# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  company_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Watchlist < ApplicationRecord
    belongs_to :user
    belongs_to :company
end
