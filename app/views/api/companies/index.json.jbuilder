@companies.each do |company|
    json.set! company.id do
        json.extract! company, :id, :name, :ticker, :ceo, :market_cap, :employees, :dividend, :about, :founded, :headquarter, :pe_ratio, :avg_volume
    end
end
