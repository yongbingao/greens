export const fetchAllWatchlists = () => {
    return $.ajax({
        method: "GET",
        url: "api/watchlists"
    })
}

export const createWatchlist = watchlist => {
    return $.ajax({
        method: "POST",
        url: "api/watchlists",
        data: {watchlist}
    })
}

export const deleteWatchlist = id => {
    return $.ajax({
        method: "DELETE",
        url: `api/watchlists/${id}`
    })
}