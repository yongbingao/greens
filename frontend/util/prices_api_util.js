export const fetchPrices = (ticker, timeframe) => {
    // debugger
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/${timeframe}?token=${window.iexAPIKey}`
    })
}

export const fetchNews = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/news/last/5?token=${window.iexAPIKey}`
    })
}

export const fetchQuotes = tickers => {
    debugger
    return $.ajax({
        method: "GET",
        url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${tickers.join(",")}&types=quote`
    })
}