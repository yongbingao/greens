import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import companiesReducer from "./companies_reducer";
import transactionReducer from "./transactions_reducer";
import watchlistReducer from "./watchlists_reducer";

export default combineReducers({
    user: userReducer,
    transactions: transactionReducer,
    watchlists: watchlistReducer,
    companies: companiesReducer
})