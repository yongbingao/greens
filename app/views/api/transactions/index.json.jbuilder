@recent_transactions.each do |transaction|
    json.set! transaction["id"] do
        json.partial! "api/transactions/transaction", transaction: transaction
    end
end
# json.companyList do 
#     json.array! @company_list
# end