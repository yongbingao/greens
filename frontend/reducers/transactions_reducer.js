import {RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS, CLEAR_TRANSACTION} from '../actions/transaction_actions';
import { merge } from 'lodash';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';

const transactionReducer = (state={allTransactions:{}, recentTransactions:{}}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_TRANSACTION:
            const { company_id, id } = action.transaction;
            const keys = Object.keys(state.recentTransactions);
            const newState = merge( {}, state);
            keys.forEach(key => {
                if (newState.recentTransactions[key].company_id === company_id){
                    delete newState.recentTransactions[key]
                }
            })
            newState.recentTransactions[id] = action.transaction;
            newState.allTransactions[id] = action.transaction;
            return newState;
        case RECEIVE_TRANSACTIONS:
            return action.transactions;
        case LOGOUT_CURRENT_USER:
            return {allTransactions: {}, recentTransactions: {}};
        default: return state;
    }
}

export default transactionReducer;