import * as APITransactionsUtil from '../util/transactions_api_util';

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_TRANSACTION_ERRORS = 'RECEIVE_TRANSACTION_ERRORS';
export const CLEAR_TRANSACTION_ERRORS = 'CLEAR_TRANSACTION_ERRORS';
export const CLEAR_TRANSACTION = 'CLEAR_TRANSACTION';

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

export const receiveTransactionErrors = errors => {
    return {
        type: RECEIVE_TRANSACTION_ERRORS,
        errors
    }
}

export const receiveClearTransactionErrors = () => {
    return {
        type: CLEAR_TRANSACTION_ERRORS
    }
}

export const receiveClearTransaction = () => {
    return {
        type: CLEAR_TRANSACTION
    }
}

export const fetchTransactions = () => dispatch => {
    return APITransactionsUtil.fetchTransactions()
        .then( transactions => {debugger; return dispatch(receiveTransactions(transactions))})
}

export const createTransaction = transaction => dispatch => {
    return APITransactionsUtil.createTransaction(transaction)
        .then( 
            transaction => dispatch(receiveTransaction(transaction)),
            err => dispatch(receiveTransactionErrors(err.responseJSON)))
}