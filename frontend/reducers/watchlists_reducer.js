import { RECEIVE_WATCHLIST, RECEIVE_WATCHLISTS, DELETE_WATCHLIST } from '../actions/watchlist_actions';
import {merge} from "lodash";

const watchlistReducer = (state={allWatchlists:{}, currentWatchlist:{}}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_WATCHLISTS:
            return {allWatchlists: action.watchlists, currentWatchlist: {}};
        case RECEIVE_WATCHLIST:
            debugger
            return Object.assign({}, state, {currentWatchlist: action.watchlist});
        case DELETE_WATCHLIST:
            return Object.assign({}, state, {currentWatchlist: {}});
            // const newState = merge( {}, state);
            // newState.currentWatchlist = {};
            // debugger
            // return newState;
        default: return state;
    }
}

export default watchlistReducer;