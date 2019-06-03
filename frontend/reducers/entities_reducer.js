import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import companiesReducer from "./companies_reducer";

export default combineReducers({
    user: userReducer,
    // transactions: "list of transaction related to current user",
    // watchlists: "watchlist items from the current user",
    companies: companiesReducer
})