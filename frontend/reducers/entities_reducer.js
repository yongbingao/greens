import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import companiesReducer from "./companies_reducer";
import transactionReducer from "./transactions_reducer";

export default combineReducers({
    user: userReducer,
    transactions: transactionReducer,
    // watchlists: "watchlist items from the current user",
    companies: companiesReducer
})