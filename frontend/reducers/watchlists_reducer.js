import { RECEIVE_WATCHLIST, RECEIVE_WATCHLISTS, DELETE_WATCHLIST } from '../actions/watchlist_actions';
import {merge} from "lodash";

const watchlistReducer = (state={}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_WATCHLISTS:
            return action.watchlists;
        case RECEIVE_WATCHLIST:
            return merge({}, state, {[action.watchlist.id]: action.watchlist});
        case DELETE_WATCHLIST:
            const newState = merge( {}, state);
            delete newState[action.id];
            return newState;
        default: return state;
    }
}

export default watchlistReducer;