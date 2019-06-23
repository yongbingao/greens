import {fetchQuotes, fetchBatchNews} from '../util/prices_api_util';
import {logoutUser} from '../actions/session_actions';
import {fetchTransactions} from '../actions/transaction_actions';
import {fetchCompaniesInfo} from '../actions/company_actions';
import {fetchAllWatchlists} from "../actions/watchlist_actions";
import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import PortfolioSummary from "./portfolio_summary";
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
            numberOfCompanies: 0,    
        };
    } 
    
    componentDidMount() {
        debugger
        this.props.fetchCompaniesInfo();
        this.props.fetchTransactions();
        this.props.fetchAllWatchlists();
    }

    componentWillUnmount() {
        if (this.state.intervalFunction) {
            clearInterval(this.state.intervalFunction);
        }
    }

    componentDidUpdate() {
        debugger
        const companiesLength = Object.keys(this.props.companies).length;
        if(this.state.numberOfCompanies !== companiesLength){
            debugger
            this.setState({numberOfCompanies: companiesLength});
            
            if(this.state.intervalFunction) clearInterval(this.state.intervalFunction);
            
            // if (!this.state.intervalFunction && Object.keys(this.props.companies).length > 0){
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
        const {companies, transactions, watchlists} = this.props;
        const {quotes} = this.state;
        let graphColor = "green";
        let latestPrice = 1000;
        let startPrice = 0;
        let priceChange = 0;
        let priceChangePercent = 0;
        debugger
        return (
            <div className="logged-in-page-container">
                <NavBar user={this.props.user} fetchCompanies={false} />
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
                        <PortfolioSummary 
                            transactions={transactions} 
                            watchlists={watchlists} 
                            quotes={quotes} 
                            companies={companies} 
                        />
                    </section>
                </section>
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    const transactions = Object.values(state.entities.transactions);
    const watchlists = Object.values(state.entities.watchlists.allWatchlists);
    const companies = {};
    if (Object.keys(state.entities.companies).length) {
        transactions.forEach(transaction => {
            const companyId = transaction.company_id;
            companies[companyId] = state.entities.companies[companyId];
        })
        watchlists.forEach(watchlist => {
            const companyId = watchlist.company_id;
            companies[companyId] = state.entities.companies[companyId];
        } )    
    }
    debugger
                    
    return {
        transactions,
        watchlists,
        companies,
        user: state.entities.user[state.session.currentUserId],
    }
}

const mdp = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchTransactions: () => dispatch(fetchTransactions()),
        fetchCompaniesInfo: () => dispatch(fetchCompaniesInfo()),
        fetchAllWatchlists: () => dispatch(fetchAllWatchlists()),
    }
}

export default withRouter(connect(msp, mdp)(DashboardPage));