import {RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS, CLEAR_TRANSACTION} from '../actions/transaction_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const transactionReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_TRANSACTION:
            const { company_id, id } = action.transaction;
            const keys = Object.keys(state);
            const newState = merge( {}, state);
            keys.forEach(key => {
                if (newState[key].company_id === company_id){
                    delete newState[key]
                }
            })
            newState[id] = action.transaction;
            return newState;
        case RECEIVE_TRANSACTIONS:
            return action.transactions;
        case LOGOUT_CURRENT_USER:
            return {};
        default: return state;
    }
}

export default transactionReducer;