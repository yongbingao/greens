export const fetchAllWatchlists = () => {
    return $.ajax({
        method: "GET",
        url: "api/watchlists"
    })
}

export const fetchWatchlist = companyId => {
    return $.ajax({
        method: "GET",
        url: `api/watchlists/${companyId}`
    })
}

export const createWatchlist = watchlist => {
    return $.ajax({
        method: "POST",
        url: "api/watchlists",
        data: {watchlist}
    })
}

export const deleteWatchlist = watchlistId => {
    debugger
    return $.ajax({
        method: "DELETE",
        url: `api/watchlists/${watchlistId}`
    })
}