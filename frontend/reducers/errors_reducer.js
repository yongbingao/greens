import { combineReducers } from "redux";
import sessionErrorsReducer from './session_errors_reducer';
import transactionErrorsReducer from './transaction_errors_reducer';

export default combineReducers({
    session: sessionErrorsReducer,
    transaction: transactionErrorsReducer
})