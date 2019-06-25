json.recentTransactions do
    @recent_transactions.each do |transaction|
        json.set! transaction["id"] do
            json.partial! "api/transactions/transaction", transaction: transaction
        end
    end
end

json.allTransactions do 
    @transactions.each do |transaction|
        json.set! transaction["id"] do
            json.partial! "api/transactions/transaction", transaction: transaction
        end
    end
end