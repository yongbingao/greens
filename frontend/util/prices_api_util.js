export const fetchPrices = (ticker, timeframe) => {
    // debugger
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${timeframe}?token=pk_1e939391af7547bf978fc8a7599fb1a9`
    })
}

export const fetchNews = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/5?token=pk_1e939391af7547bf978fc8a7599fb1a9`
    })
}