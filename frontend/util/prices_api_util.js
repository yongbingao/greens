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
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers.join(",")}&types=quote&token=${window.iexAPIKey}`
    })
}

export const fetchBatchNews = tickers => {
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers.join(",")}&types=news&last=2&token=${window.iexAPIKey}`
    })
}

export const fetchBatchDayPrices = tickers => {
    debugger
    return $.ajax({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${tickers.join(",")}&types=chart&range=1d&token=${window.iexAPIKey}`
    })
}