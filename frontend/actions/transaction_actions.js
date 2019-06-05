import * as APITransactionsUtil from '../util/transactions_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

const receiveTransaction = transaction => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction
    }
}

const receiveTransactions = transactions => {
    return {
        type: RECEIVE_TRANSACTIONS,
        transactions
    }
}

export const fetchTransactions = () => dispatch => {
    return APITransactionsUtil.fetchTransactions()
        .then( transactions => dispatch(receiveTransactions(transactions)))
}

export const createTransaction = transaction => dispatch => {
    return APITransactionsUtil.createTransaction(transaction)
        .then( transaction => dispatch(receiveTransaction(transaction)))
}