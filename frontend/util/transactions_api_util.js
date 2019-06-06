export const fetchTransactions = () => {
    return $.ajax({
        method: "GET",
        url: "api/transactions"
    })
}

export const createTransaction = transaction => {
    debugger
    return $.ajax({
        method: "POST",
        url: "api/transactions",
        data: {transaction}
    })
}
