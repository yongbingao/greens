import * as APIWatchlistUtil from "../util/watchlist_api_util";

export const RECEIVE_WATCHLISTS = 'RECEIVE_WATCHLISTS';
export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST';
export const DELETE_WATCHLIST = 'DELETE_WATCHLIST';

const receiveWatchlist = watchlist => {
    return {
        type: RECEIVE_WATCHLIST,
        watchlist
    }
}

const receiveWatchlists = watchlists => {
    return {
        type: RECEIVE_WATCHLISTS,
        watchlists
    }
}

const deleteWatchlist = watchlist => {
    return {
        type: DELETE_WATCHLIST,
        watchlist,
    }
}

export const createWatchlist = watchlist => dispatch => {
    return APIWatchlistUtil.createWatchlist(watchlist)
        .then(resp => dispatch(receiveWatchlist(resp)))
}

export const removeWatchlist = watchlistId => dispatch => {
    return APIWatchlistUtil.deleteWatchlist (watchlistId)
        .then(resp => dispatch(deleteWatchlist(resp)))
}

export const fetchWatchlist = companyId => dispatch => {
    return APIWatchlistUtil.fetchWatchlist(companyId)
        .then(resp => dispatch(receiveWatchlist(resp)))
}

export const fetchAllWatchlists = () => dispatch => {
    return APIWatchlistUtil.fetchAllWatchlists()
        .then(resp => dispatch(receiveWatchlists(resp)))
}