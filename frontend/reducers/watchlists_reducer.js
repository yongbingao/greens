import {RECEIVE_WATCHLIST, RECEIVE_WATCHLISTS, DELETE_WATCHLIST} from '../actions/watchlist_actions';
import {LOGOUT_CURRENT_USER} from "../actions/session_actions";
import {merge} from "lodash";

const watchlistReducer = (state={allWatchlists:{}, currentWatchlist:{}}, action) => {
    Object.freeze(state);
    const newState = merge({}, state);
    switch(action.type){
        case RECEIVE_WATCHLISTS:
            return {allWatchlists: action.watchlists, currentWatchlist: {}};
        case RECEIVE_WATCHLIST:
            if(action.watchlist.id) newState.allWatchlists[action.watchlist.id] = action.watchlist;
            return Object.assign({}, newState, {currentWatchlist: action.watchlist});
        case DELETE_WATCHLIST:
            const id = action.watchlist.id;
            delete newState.allWatchlists[id];
            return Object.assign({}, newState, {currentWatchlist: {}});
        case LOGOUT_CURRENT_USER:
            return {allWatchlists: {}, currentWatchlist: {}};
        default: return state;
    }
}

export default watchlistReducer;