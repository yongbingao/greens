import {RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS} from '../actions/transaction_actions';
import { merge } from 'lodash';

const transactionReducer = (state={}, action) => {
    Object.freeze(state);
    switch (action.type){
        case RECEIVE_TRANSACTION:
            return merge( {}, state, {[action.transaction.id]: action.transaction});
        case RECEIVE_TRANSACTIONS:
            return action.transactions;
        default: return state;
    }
}

export default transactionReducer;