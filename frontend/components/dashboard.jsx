import React from 'react';
import { fetchQuotes, fetchBatchNews } from '../util/prices_api_util';
import { logoutUser } from '../actions/session_actions';
import { fetchTransactions } from '../actions/transaction_actions';
import { fetchCompaniesInfo } from '../actions/company_actions';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import NavBar from './nav_bar';
import Chart from './chart';
import News from './news';

class DashboardPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            news: [],
            intervalFunction: null,
            quotes: {},    
        };
        // this.handleLogout = this.handleLogout.bind(this);
    } 
    
    componentDidMount() {
        // debugger
        this.props.fetchCompaniesInfo();
        this.props.fetchTransactions();
    }

    componentWillUnmount() {
        if (this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate() {
        if (!this.state.intervalFunction && Object.keys(this.props.companies).length > 0){
            const tickers = Object.values(this.props.companies).map( el => el.ticker);
            fetchQuotes(tickers)
                .then( quotes => this.setState({quotes}));
            fetchBatchNews(tickers).then( resp => {
                const newsObj = Object.values(resp);
                let news = [];
                newsObj.forEach( el => news = news.concat(el.news));
                this.setState({news});
            });

            this.setState({
                intervalFunction: setInterval(() => {
                    fetchQuotes(tickers).then( quotes => this.setState({quotes}))
                }, 60000)
            });
        }
    }

    getNewPrice() {}

    render() {
        const { companies } = this.props;
        const { quotes } = this.state;
        let graphColor = "green";
        let latestPrice = 1000;
        let startPrice = 0;
        let priceChange = 0;
        let priceChangePercent = 0;
        
        const transactionList = this.props.transactions.map(el => {
            let ticker = null;
            let price = null;
            // debugger
            if (el.net_shares === 0) {
                return;
            }
            if ( companies[el.company_id]) {
                // debugger
                ticker = companies[el.company_id].ticker;
            }
            if (quotes[ticker]) {
                // debugger
                price = (quotes[ticker].quote.latestPrice).toFixed(2);
            }
            return (
                <Link key={ticker} className="logged-in-page-content-right-section-stock" to={`/stock/${el.company_id}`}>
                    <section className="content-right-section-stock-left">
                        <span className='content-right-sction-stock-ticker'>{ticker}</span>
                        <span className='content-right-sction-stock-share'>{`${el.net_shares.toLocaleString()} Share`}</span>
                    </section>
                    <span className='content-right-sction-stock-price'>{`$${Number(price).toLocaleString()}`}</span>
                </Link>
            )
        })

        if (transactionList.length) transactionList.unshift(<div key="stocks-title" className="content-right-section-stock-title">Stocks</div>);

        return (
            <div className="logged-in-page-container">
                <NavBar user={this.props.user}/>
                <section className="logged-in-page-content-container">
                    <section className='logged-in-page-content-left-section'>

                        <h2>{latestPrice ? "$".concat(latestPrice.toLocaleString()) : latestPrice}</h2>
                        <h4>{
                            priceChange ?
                                (priceChange > 0 ? "+".concat("$", priceChange, ` (${priceChangePercent}%)`) : "-".concat("$", priceChange * -1, ` (${priceChangePercent}%)`))
                                : priceChange} </h4>
                        <Chart data={this.state.data} graphColor={graphColor} startPrice={startPrice} />
                        <br />
                        <section className="logged-in-page-timeframe-buttons">
                            <button
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1D" ? "logged-in-page-timeframe-1D" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("1D")}>1D
                            </button>
                            <button
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1M" ? "logged-in-page-timeframe-1M" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("1M")}>1M
                            </button>
                            <button
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "3M" ? "logged-in-page-timeframe-3M" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("3M")}>3M
                            </button>
                            <button
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "1Y" ? "logged-in-page-timeframe-1Y" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("1Y")}>1Y
                            </button>
                            <button
                                id={`${(graphColor).concat("-", this.state.timeframeFocus == "5Y" ? "logged-in-page-timeframe-5Y" : "")}`}
                                className={"logged-in-page-timeframe-button".concat("-", graphColor)}
                                onClick={this.getNewPrice("5Y")}>5Y
                            </button>
                        </section>

                        <h3>Recent News</h3>
                        <News news={this.state.news} />
                    </section>
                    
                    <section className="logged-in-page-content-right-section">
                        <ul className="logged-in-page-content-right-section-stocks">
                            {transactionList}
                        </ul>
                    </section>
                </section>
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
    if (state.entities.companies && transactions.length) {
        transactions.forEach( el => {
            // debugger
            if (state.entities.companies[el.company_id]) {
                // debugger
                companies[el.company_id] = state.entities.companies[el.company_id]
            }
        })    
    }
    // debugger
                    
    return {
        transactions,
        companies,
        user: state.entities.user[state.session.currentUserId],
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