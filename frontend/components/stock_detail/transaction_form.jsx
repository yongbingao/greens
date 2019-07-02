import React from 'react';
import { updateUser } from '../../actions/session_actions';
import { createTransaction, fetchTransactions } from '../../actions/transaction_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TransactionForm extends React.Component {
    constructor(props){
        super(props),
        this.state = { 
            shares: "",
            notEnoughMoney: false,
            notEnoughSharesToSell: false,
            invalidShares: false,
            currentTab: "Buy",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateField = this.updateField.bind(this);
        this.handleBuySell = this.handleBuySell.bind(this);
    }

    componentDidMount() {
        this.props.fetchTransactions();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.companyId !== this.props.match.params.companyId){
            this.setState({notEnoughMoney: false, notEnoughSharesToSell: false, invalidShares: false});
        }
    }

    updateField(event) {
        if (event.target.value == "-" || event.target.value == ""){
            this.setState({shares: event.target.value})
        } else if (Number.isInteger(Number(event.target.value))) {
            this.setState({ shares: Number(event.target.value) })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const multiplier = event.target[1].value === "Buy" ? 1 : -1;
        this.setState({notEnoughMoney: false, notEnoughSharesToSell: false, invalidShares: false})
        if (typeof this.state.shares !== 'number' || this.state.shares <= 0) {
            this.setState({invalidShares: true});
        } else if (this.props.user.current_buying_power < (this.state.shares * this.props.price)){
            this.setState({notEnoughMoney: true})
        } else {
            const prevTransaction = this.props.transaction;
            let transaction = {};

            if (!prevTransaction) {
                if(event.target[1].value === "Sell") {
                    this.setState({notEnoughSharesToSell: true});
                    return;
                }
                else{
                    transaction = {
                        user_id: this.props.user.id,
                        company_id: this.props.companyId,
                        purchase_price: this.props.price,
                        purchase_shares: this.state.shares,
                        average_price: this.props.price,
                        net_shares: this.state.shares
                    }
                }
            } else if (Object.values(prevTransaction).length > 0){
                const net_shares = prevTransaction.net_shares + this.state.shares * multiplier;

                if (net_shares < 0) {
                    this.setState({notEnoughSharesToSell: true});
                    return;
                } else {
                    const average_price = net_shares ? 
                        (prevTransaction.average_price * prevTransaction.net_shares 
                        + this.props.price * this.state.shares * multiplier) / net_shares : 0;
                    transaction = {
                        user_id: this.props.user.id,
                        company_id: this.props.companyId,
                        purchase_price: this.props.price,
                        purchase_shares: this.state.shares,
                        average_price,
                        net_shares,
                    }
                }
            } 
            this.props.createTransaction(transaction)
                .then(() => {
                    this.props.updateUser({
                    id: this.props.user.id, 
                    current_buying_power: (this.props.user.current_buying_power - this.state.shares * this.props.price * multiplier)});
                    this.setState({shares: ""});
                });
        }   
    }

    handleBuySell(type){
        return (event) => {
            if (type !== this.state.currentTab) this.setState({currentTab: type});
        }
    }

    render() {
        const { transaction, ticker, price, user } = this.props;
        const {currentTab} = this.state;

        const { invalidShares, notEnoughMoney, notEnoughSharesToSell } = this.state;
        const errorList = (invalidShares || notEnoughMoney || notEnoughSharesToSell) ? (
                <ul className="transaction-form-errors">
                    <div>
                        <i className='fas fa-exclamation-circle'></i>
                        <span>Error</span>
                    </div>
                    <li>{this.state.invalidShares ? "Please enter a valid number of shares." : ""}</li>
                    <li>{this.state.notEnoughMoney ? "You don't have sufficient buying power." : ""}</li>
                    <li>{this.state.notEnoughSharesToSell ? "You don't own sufficient shares." : ""}</li>
                </ul>
            ) : "";

        return (
            <form className="details-page-transaction-form" onSubmit={this.handleSubmit}>
                <div className="transaction-form-title-container">
                    <ul className="transaction-form-title-list">
                        <li 
                            onClick={this.handleBuySell("Buy")} 
                            className={`transaction-form-title-buy ${currentTab === "Buy" ? "transaction-active" : ""}`}>
                            Buy {ticker}
                        </li>
                        <li 
                            onClick={this.handleBuySell("Sell")} 
                            className={`transaction-form-title-sell ${currentTab === "Sell" ? "transaction-active" : ""}`}>
                            Sell {ticker}
                        </li>
                    </ul>
                </div>
                <div className="transaction-form-shares">
                    <label htmlFor="transaction-box-shares">Shares</label>
                    <input id="transaction-box-shares" onChange={this.updateField} type="number" value={this.state.shares} placeholder="0" align="right"/>
                </div>
                <div className="transaction-form-price">
                    <div>Market Price</div>                    
                    <div>${price.toLocaleString()}</div>
                </div>
                <div className='transaction-form-estimated-cost'>
                    <div>Estimated Cost</div>
                    <div>${this.state.shares == "-" ? 0.00 : Number((this.state.shares * price).toFixed(2)).toLocaleString()}</div>
                </div>
                {errorList}
                <input className="transaction-form-submit-button" type="submit" value={currentTab}/>
                <div className='transaction-form-buying-power'>${Number(user.current_buying_power).toLocaleString()} Buying Power Available</div>
                <div className='transaction-form-owned-shares'>{(transaction && Object.keys(transaction).length > 0) ? `You own ${transaction.net_shares.toLocaleString()} shares.` : ""}</div>
            </form>
        )
    }
}

const msp = (state, ownProps) => {
    const companyId = ownProps.match.params.companyId;
    const recentTransactions = Object.values(state.entities.transactions.recentTransactions);
    let transaction;
    recentTransactions.forEach( el => {
        if (el.company_id === Number(companyId)) transaction = el;
    })

    return {
        transaction, 
        user: state.entities.user[state.session.currentUserId],
        errors: state.errors.transaction,
    }
}

const mdp = dispatch => {
    return {
        updateUser: user => dispatch(updateUser(user)),
        createTransaction: transaction => dispatch(createTransaction(transaction)),
        fetchTransactions: () => dispatch(fetchTransactions()),
    }
}

export default withRouter(connect(msp, mdp)(TransactionForm));