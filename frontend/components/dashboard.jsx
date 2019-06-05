import React from 'react';
import { fetchQuotes } from '../util/prices_api_util';
import { logoutUser } from '../actions/session_actions';
import { fetchTransactions } from '../actions/transaction_actions';
import { fetchCompaniesInfo } from '../actions/company_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            intervalFunction: null,
            quotes: {},    
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.props.logoutUser();
    }   
    
    componentDidMount() {
        this.props.fetchCompaniesInfo();
        this.props.fetchTransactions();
    }

    componentDidUpdate() {
        if (!this.state.intervalFunction && Object.keys(this.props.companies).length > 0){
            this.setState({intervalFunction: true});
            const tickers = Object.values(this.props.companies).map( el => el.ticker);
            fetchQuotes(tickers)
                .then( quotes => {
                    debugger
                    this.setState({quotes})});
            // setInterval
        }
    }

    render() {
        const { companies } = this.props;
        const { quotes } = this.state;
        const transactionList = this.props.transactions.map(el => {
            let ticker = null;
            let price = null;
            // debugger
            if ( Object.keys(companies).length !== 0 ) {
                ticker = companies[el.company_id].ticker;
            }

            if (Object.keys(quotes).length > 0) {
                debugger
                price = quotes[companies[el.company_id].ticker].quote.latestPrice;
            }
            return <li>{`${ticker}`} <br/> {`net shares: ${el.net_shares}`} <br/> {`price: ${price}`}</li>
        })
        // const companyList = this.props.companies.map( el => {
        //     return <li>{`${el.id}: ${el.ticker}`}</li>
        // })

        // debugger
        return (
            <div>
                <h1>Dashboard Page</h1>
                <button onClick={this.handleLogout}>Log Out</button>
                <br/>
                {this.props.user.username}
                <br/>
                {this.props.user.current_buying_power}
                <br/>
                <br/>
                <ul>
                    {transactionList}
                </ul>
                {/* <ul>
                    {companyList}
                </ul> */}
                <br/>
                {/* <LineChart style={{"marginTop": "300px"}}
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10, right: 10, bottom: 10, left: 100,
                    }}>

                    <XAxis dataKey="label" hide={true} />
                    <YAxis hide={true} type='number' domain={['dataMin', 'dataMax']} />
                    <Tooltip content={<CustomToolTip />}  wrapperStyle={ {'transform': "none !important", "translate": "none !important"}} />
                    <Line type="linear" dataKey='marketClose' stroke="#00ea9c" dot={false}/>
                </LineChart> */}

            </div>
        )
    }
}

const msp = (state, ownProps) => {
    // let transaction_keys = Object.keys(state.entities.transactions);
    // const transactions = [];
    // transaction_keys.forEach(el => {
    //     if (typeof el === 'number'){
    //         transactions.push(state.entities.transactions[el])
    //     }
    // })
    // const company_ids = [];
    // const transactions = [];
    
    // transactionsArray.forEach(el => {
        //     // debugger
        //     const id = el.company_id
        //     if (!company_ids.includes(id)){
            //         company_ids.push(id);
            //         transactions.push(el);
            //         if (state.entities.companies){
                //             // debugger
                //             companies.push(state.entities.companies[id]);
                //         }
                //     } else {
                    //         transactions[transactions.length - 1] = el;
                    //     }
                    // })
    const transactions = Object.values(state.entities.transactions);
    const companies = {};
    if (state.entities.companies) {
        transactions.forEach( el => {
            companies[el.company_id] = state.entities.companies[el.company_id]
        })    
    }
    // debugger
                    
    return {
        transactions,
        companies,
        user: state.entities.user,
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchTransactions: () => dispatch(fetchTransactions()),
        fetchCompaniesInfo: () => dispatch(fetchCompaniesInfo())
    }
}

export default withRouter(connect(msp, mdp)(DashboardPage));